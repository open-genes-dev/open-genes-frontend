import {AfterViewInit, Component, Input, OnChanges, OnInit, Output} from '@angular/core';

import {ApiService} from '../../core/services/api.service';
import {Genes, Filter} from '../../core/models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  genes: Genes[];
  lastGenes: Genes[];
  filters: Filter;
  error: number;

  private expressionTranslates = { // TODO: убрать хардкод
    0: 'no data',
    1: 'decreased',
    2: 'increased',
    3: 'mixed'
  };

  constructor(
    private readonly apiService: ApiService,
    private readonly translate: TranslateService
  ) {
    this.filters = {
      byName: false,
      byAge: false,
      byClasses: [],
      byExpressionChange: null
    };
  }

  ngOnInit() {
    this.getGenes();
    this.getLastEditedGenes();
  }

  private getGenes() {
    this.apiService.getGenes().subscribe((genes) => {
      this.genes = genes;
    }, error => this.error = error);
  }

  private getLastEditedGenes() {
    this.apiService.getLastEditedGene().subscribe((genes) => {
      this.lastGenes = genes;
    });
  }

  public filterByFuncClusters(fc: number[]) {
    if (fc.length > 0) {
      this.apiService.getGenesByFunctionalClusters(fc).subscribe((genes) => {
        this.genes = genes;
      }, error => this.error = error);
    } else {
      this.getGenes();
    }
  }

  public filterByExpressionChange(expression: number) {
    if (expression) {
      this.apiService.getGenesByExpressionChange(expression).subscribe(genes => {
        this.genes = genes;
      }, error => this.error = error);
    } else {
      this.getGenes();
    }
  }

  /**
   * Сброс фильтров таблицы генов
   */
  public filtersCleared() {
    this.getGenes();
  }
}
