import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampeoesModule } from './campeoes/campeoes.module';
import { CadastroCampeoesComponent } from './campeoes/cadastro-campeoes/cadastro-campeoes.component';
import { ListagemCampeoesComponent } from './campeoes/listagem-campeoes/listagem-campeoes.component';
import { VisualizarCampeoesComponent } from './campeoes/visualizar-campeoes/visualizar-campeoes.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'campeoes',
      pathMatch: 'full'
  },
  {
    path: 'campeoes',
    children: [
      {
        path: 'listar',
        component: ListagemCampeoesComponent
      },
      {
        path: 'salvar',
        children: [
          {
            path: '',
            component: CadastroCampeoesComponent
          },
        ]
      },
      {
        path: 'atualizar',
        children: [
          {
            path: '',
            component: CadastroCampeoesComponent
          },
        ]
      },
      {
        path: ':id',
        component: VisualizarCampeoesComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'campeoes' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CampeoesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
