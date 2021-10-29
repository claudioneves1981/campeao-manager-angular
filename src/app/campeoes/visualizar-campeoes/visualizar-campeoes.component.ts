import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CampeoesService } from 'src/app/core/campeoes.service';
import { Campeao} from 'src/app/shared/models/campeao';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-campeoes',
  templateUrl: './visualizar-campeoes.component.html',
  styleUrls: ['./visualizar-campeoes.component.css']
})
export class VisualizarCampeoesComponent implements OnInit {
  //readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  campeao: Campeao;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private campeoesService: CampeoesService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/campeoes/atualizar');
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.campeoesService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/campeoes'));
      }
    });
  }

  private visualizar(): void {
    this.campeoesService.visualizar(this.id).subscribe((campeao: Campeao) => this.campeao = campeao);
  }

}
