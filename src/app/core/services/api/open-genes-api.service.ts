import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgeRelatedProcesses, AgingMechanisms, Gene, Genes, SelectionCriteria } from '../../models';
import { TranslateService } from '@ngx-translate/core';
import { AssociatedDiseaseCategories, AssociatedDiseases } from '../../models/open-genes-api/associated-diseases.model';
import { GenesWLifespanResearches } from '../../models/open-genes-api/genes-with-increase-lifespan-researches.model';
import { GenesInHorvathClock } from '../../models/open-genes-api/genes-in-horvath-clock.model';
import { ApiResponse } from '../../models/api-response.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private genes$: Observable<ApiResponse<Genes>>;
  private readonly currentLang: string;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.currentLang = this.translate.currentLang;

    // API doesn't have Chinese language
    if (this.translate.currentLang === 'zh') {
      this.currentLang = 'en';
    }
  }

  // Legacy API

  getLastEditedGene(): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-latest`);
  }

  getGenesByFunctionalClusters(list: number[]): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-functional-cluster/${list}?lang=${this.currentLang}`);
  }

  getGenesByExpressionChange(expression: number): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-expression-change/${expression}?lang=${this.currentLang}`);
  }

  getGeneByHGNCsymbol(symbol: string): Observable<Gene> {
    return this.http.get<Gene>(`/api/gene/${symbol}?lang=${this.currentLang}`);
  }

  getGoTermMatchByString(request: string): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene/by-go-term/${request}`);
  }

  getGenesWLifespanResearches(): Observable<GenesWLifespanResearches[]> {
    return this.http.get<GenesWLifespanResearches[]>(`/api/increase-lifespan?lang=${this.currentLang}`);
  }

  getGenesInHorvathClock(): Observable<GenesInHorvathClock[]> {
    return this.http.get<GenesInHorvathClock[]>(`/api/methylation?lang=${this.currentLang}`);
  }

  getGenes(): Observable<Genes[]> {
    return this.http.get<Genes[]>(`/api/gene?lang=${this.currentLang}`);
  }

  // New API
  getGenesV2(): Observable<ApiResponse<Genes>> {
    if (this.genes$) {
      this.genes$ = this.http
        .get<ApiResponse<Genes>>(`/api/gene/search?lang=${this.currentLang}`)
        .pipe(shareReplay(1));
      return this.genes$;
    }

    return this.http.get<ApiResponse<Genes>>(`/api/gene/search?lang=${this.currentLang}`);
  }

  getDiseases(): Observable<AssociatedDiseases[]> {
    return this.http.get<AssociatedDiseases[]>(`/api/disease?lang=${this.currentLang}`);
  }

  getDiseaseCategories(): Observable<AssociatedDiseaseCategories[]> {
    return this.http.get<AssociatedDiseaseCategories[]>(`/api/disease-category?lang=${this.currentLang}`);
  }

  getSelectionCriteria(): Observable<SelectionCriteria[]> {
    return this.http.get<SelectionCriteria[]>(`/api/criteria?lang=${this.currentLang}`);
  }

  getAgeRelatedProcesses(): Observable<AgeRelatedProcesses[]> {
    return this.http.get<AgeRelatedProcesses[]>(`/api/age-related-processes?lang=${this.currentLang}`);
  }

  getAgingMechanisms(): Observable<AgingMechanisms[]> {
    return this.http.get<AgingMechanisms[]>(`/api/aging-mechanisms?lang=${this.currentLang}`);
  }
}
