import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Genes } from '../../../core/models';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from '../../../core/services/api/open-genes-api.service';
import { ToMap } from '../../../core/utils/to-map';
import { SettingsService } from '../../../core/services/settings.service';
import { SettingsEnum } from '../../../core/models/settings.model';
import { SearchModes } from '../../../core/models/search-modes.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent extends ToMap implements OnInit, OnDestroy {
  @Inject(Document) public document: Document;

  @Input() genesList: Genes[];
  @Input() set isGoMode(value: boolean) {
    this.isGoTermsMode = value;
    this.searchedData = [];
    this.searchForm.get('searchField').setValue('');
  }

  @Output() dataFromSearchBar: EventEmitter<any> = new EventEmitter<any>();

  public searchedData: Genes[];
  public searchForm: FormGroup;
  public isGoTermsMode: boolean;
  public showSearchResult = false;
  public biologicalProcess: Map<any, any>;
  public cellularComponent: Map<any, any>;
  public molecularActivity: Map<any, any>;

  private subscription$ = new Subject();
  private settingsKey = SettingsEnum;

  constructor(
    private renderer: Renderer2,
    private apiService: ApiService,
    private settingsService: SettingsService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
    this.searchForm = new FormGroup({
      searchField: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
    this.cancelSearch();
  }

  ngOnInit(): void {
    this.searchForm
      .get('searchField')
      .valueChanges.pipe(
        filter((query: string) => !!query),
        map((query: string) => query.toLowerCase()),
        filter((query: string) => {
          this.showSearchResult = query.length >= 2;

          if (this.showSearchResult) {
            this.renderer.addClass(document.body, 'body--search-on-main-page-is-active');
          } else {
            this.renderer.removeClass(document.body, 'body--search-on-main-page-is-active');
          }

          if (this.showSearchResult) {
            if (this.isGoTermsMode) {
              return true;
            } else {
              this.autocompleteSearch(query);
            }
          }

          return false;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => this.apiService.getGoTermMatchByString(query)),
        takeUntil(this.subscription$)
      )
      .subscribe((genes: Genes[]) => {
        this.searchedData = genes;
        this.mapTerms();
        this.cdRef.markForCheck();
      });
  }

  private mapTerms(): void {
    for (const item of this.searchedData) {
      this.biologicalProcess = this.toMap(item.terms?.biological_process);
      this.cellularComponent = this.toMap(item.terms?.cellular_component);
      this.molecularActivity = this.toMap(item.terms?.molecular_activity);
    }
  }

  private autocompleteSearch(query: string): void {
    if (query.length !== 0) {
      this.searchedData = this.genesList.filter((gene) => {
        const searchedText = [gene.symbol, gene.id, gene?.ensembl, gene.name, ...gene.aliases].join(' ').toLowerCase();
        return searchedText.includes(query);
      });
    }
  }

  public setSearchMode(mode: SearchModes): void {
    this.settingsService.setSettings(this.settingsKey.searchMode, mode);
    this.isGoTermsMode = mode === 'goSearch';
    this.searchedData = [];
    this.searchForm.get('searchField').setValue('');
    this.onSearch();
  }

  public onSearch(): void {
    const query: string = this.searchForm.get('searchField').value;
    this.dataFromSearchBar.emit({
      isGoTermsMode: this.isGoTermsMode,
      searchQuery: query.toLowerCase(),
    });
  }

  public cancelSearch(event?): void {
    this.showSearchResult = false;
    this.renderer.removeClass(document.body, 'body--search-on-main-page-is-active');
    event?.stopPropagation();
  }
}
