import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneComponent } from './gene.component';
import { RouterModule } from '@angular/router';
import { GENE_ROUTES } from './gene-routing';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { PipesModule } from '../../modules/pipes/pipes.module';
import { MaterialModule } from '../../modules/vendors/material.module';
import { NgToArrayPipeModule } from 'angular-pipes';
import { ResearchesComponent } from './researches/researches.component';
import { GeneOntologyComponent } from './gene-ontology/gene-ontology.component';
import { HumanProteinAtlasComponent } from './human-protein-atlas/human-protein-atlas.component';
import { ExpressionComponent } from './expression/expression.component';
import { DynamicContentAnchorsDirective } from './directives/anchor-links.directive';
import { UiComponentsModule } from '../../components/ui-components/ui-components.module';
import { SidebarModule } from '../../components/shared/sidebar/sidebar.module';
import { DirectivesModule } from '../../directives/directives.module';
import { NoContentModule } from '../../components/shared/no-content/no-content.module';
import { IconModule } from '../../components/ui-components/components/icon/app-icon.module';

@NgModule({
  declarations: [
    GeneComponent,
    ResearchesComponent,
    GeneOntologyComponent,
    HumanProteinAtlasComponent,
    ExpressionComponent,
    DynamicContentAnchorsDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(GENE_ROUTES),
    TranslateModule,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    PipesModule,
    MaterialModule,
    NgToArrayPipeModule,
    UiComponentsModule,
    SidebarModule,
    DirectivesModule,
    NoContentModule,
    IconModule,
  ],
})
export class GeneModule {}
