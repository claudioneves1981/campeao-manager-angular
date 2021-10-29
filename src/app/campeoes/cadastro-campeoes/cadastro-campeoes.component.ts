import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { CampeoesService } from 'src/app/core/campeoes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Campeao } from 'src/app/shared/models/campeao';

@Component({
  selector: 'dio-cadastro-campeoes',
  templateUrl: './cadastro-campeoes.component.html',
  styleUrls: ['./cadastro-campeoes.component.scss']
})
export class CadastroCampeoesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  tipos: Array<string>;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private campeaoService: CampeoesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.campeaoService.visualizar(this.id)
        .subscribe((campeao: Campeao) => this.criarFormulario(campeao));
    } else {
      this.criarFormulario(this.criarCampeaoEmBranco());
    }

    this.tipos = ['JEDI','SITH'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const campeao = this.cadastro.getRawValue() as Campeao;
    if (this.id) {
      campeao.id = this.id;
      this.editar(campeao);
    } else {
      this.salvar(campeao);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(campeao: Campeao): void {
    this.cadastro = this.fb.group({
      nome: [campeao.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      email: [campeao.email, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      corSabre: [campeao.corSabre, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      tipo: [campeao.tipo, [Validators.required]]
    });
  }

  private criarCampeaoEmBranco(): Campeao {
    return {
      id: null,
      nome: null,
      corSabre: null,
      tipo: null
    } as Campeao;
  }

  private salvar(campeao: Campeao): void {
    this.campeaoService.salvar(campeao).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo campeao',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('campeoes');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(campeao: Campeao): void {
    this.campeaoService.editar(campeao).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('campeoes'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
