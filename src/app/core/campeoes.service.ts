import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { Campeao } from '../shared/models/campeao';

const url = 'http://localhost:4200/api/campeoes/';

@Injectable({
  providedIn: 'root'
})
export class CampeoesService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(campeao: Campeao): Observable<Campeao> {
    return this.http.post<Campeao>(url+"salvar", campeao);
  }

  editar(campeao: Campeao): Observable<Campeao> {
    return this.http.put<Campeao>(url+"atualizar", campeao);
  }

  listar(config: ConfigPrams): Observable<Campeao[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Campeao[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Campeao> {
    return this.http.get<Campeao>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
