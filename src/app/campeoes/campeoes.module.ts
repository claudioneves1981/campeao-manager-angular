import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CadastroCampeoesComponent } from './cadastro-campeoes/cadastro-campeoes.component';
import { MaterialModule } from '../shared/material/material.module';
import { ListagemCampeoesComponent } from './listagem-campeoes/listagem-campeoes.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarCampeoesComponent } from './visualizar-campeoes/visualizar-campeoes.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [CadastroCampeoesComponent, ListagemCampeoesComponent, VisualizarCampeoesComponent]
})
export class CampeoesModule { }
