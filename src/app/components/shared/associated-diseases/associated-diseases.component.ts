import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssociatedDiseases } from '../../../core/models/open-genes-api/associated-diseases.model';
import { WrapIntoAccordion } from '../../ui-components/components/accordion/wrap-into-accordion';

@Component({
  selector: 'app-associated-diseases',
  templateUrl: './associated-diseases.component.html',
  styleUrls: ['./associated-diseases.component.scss'],
})
export class AssociatedDiseasesComponent extends WrapIntoAccordion implements OnInit {
  @Input() geneDiseases: AssociatedDiseases;
  @Input() activeListItem: string[];
  @Output() clickEvent: EventEmitter<string> = new EventEmitter();

  public mappedDiseases: Map<number, any> = new Map();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.mapDiseases();
    this.setListLength(this.geneDiseases);
    this.putItemsIntoAccordion(this.geneDiseases);
  }

  // TODO: OG-661. Это поменяется при переходе на новую версию api/gene/search (будет массивом объектов)
  private mapDiseases(): void {
    for (const [key, value] of Object.entries(this.geneDiseases)) {
      this.mappedDiseases.set(+key, value);
    }
  }

  public emitOnClick(diseaseKey: any): void {
    this.clickEvent.emit(diseaseKey);
  }
}
