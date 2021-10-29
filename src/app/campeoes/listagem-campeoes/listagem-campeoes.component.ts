import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CampeoesService } from 'src/app/core/campeoes.service';
import { Campeao } from 'src/app/shared/models/campeao';
import { ConfigPrams } from 'src/app/shared/models/config-prams';

@Component({
  selector: 'dio-listagem-campeoes',
  templateUrl: './listagem-campeoes.component.html',
  styleUrls: ['./listagem-campeoes.component.scss']
})
export class ListagemCampeoesComponent implements OnInit {
 // readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  campeoes: Campeao[] = [];
  filtrosListagem: FormGroup;
  tipos: Array<string>;

  constructor(private campeoesService: CampeoesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      tipo: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('tipo').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'tipo', valor: val};
      this.resetarConsulta();
    });

    this.tipos = ['JEDI', 'SITH'];

    this.listarCampeoes();
  }

  onScroll(): void {
    this.listarCampeoes();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/campeoes/' + id);
  }

  private listarCampeoes(): void {
    this.config.pagina++;
    this.campeoesService.listar(this.config)
      .subscribe((campeoes: Campeao[]) => this.campeoes.push(...campeoes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.campeoes = [];
    this.listarCampeoes();
  }
}
