import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramsComponent } from './diagrams.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectedGraphComponent } from './charts/directed-graph/directed-graph.component';
import { DirectedGraphService } from './services/directed-graph.service';

const diagramsRoutes: Routes = [{ path: '', component: DiagramsComponent }];

@NgModule({
  declarations: [DiagramsComponent, DirectedGraphComponent],
  imports: [CommonModule, RouterModule.forChild(diagramsRoutes), TranslateModule],
  providers: [DirectedGraphService],
})
export class DiagramsModule {}
