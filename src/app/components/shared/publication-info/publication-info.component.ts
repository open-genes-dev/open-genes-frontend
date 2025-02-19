import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { PubmedApiService } from '../../../core/services/api/pubmed-api.service';
import { Subject } from 'rxjs';
import { ArticleData } from '../../../core/models/vendors-api/publications-search-api/article-data.model';
import { TranslateService } from '@ngx-translate/core';

interface ArticleDataConverted {
  title: string;
  publisher: string;
  publicationYear: string;
  citation: number;
}

@Component({
  selector: 'app-publication-info',
  templateUrl: './publication-info.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PublicationInfoComponent implements OnInit, OnDestroy {
  @Input() doi: string;

  public isLoading: boolean;
  public isDataLoaded: boolean;
  public articleInfo: ArticleDataConverted;
  private subscription$ = new Subject();

  constructor(public translate: TranslateService, private pubmedApiService: PubmedApiService) {}

  ngOnInit(): void {
    this.getArticleData(this.doi);
  }

  public getArticleData(doi): void {
    this.isLoading = true;
    this.pubmedApiService
      .getArticleByDoi(doi)
      .pipe(
        map(
          (res: ArticleData): ArticleDataConverted => {
            return {
              title: res.bibliographic_data.artifact_title,
              publisher: res.bibliographic_data.publisher,
              publicationYear: res.bibliographic_data.publication_year,
              citation: res.sort_count.citation.total,
            };
          }
        ),
        takeUntil(this.subscription$)
      )
      .subscribe(
        (res) => {
          this.articleInfo = res;
          this.isLoading = false;
          this.isDataLoaded = true;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.isDataLoaded = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
