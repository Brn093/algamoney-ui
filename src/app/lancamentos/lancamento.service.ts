import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { format } from  'date-fns';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  dataVencimentoAte: any;
  dataVencimentoDe: any;
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService { 

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  datePipe: any;
  dataVencimentoDe!: Date;
  //lancamentoService: any;
  //grid: any;

  constructor(private http: HttpClient) { }  

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    console.log(lancamento);

    const res = firstValueFrom(this.http.post<Lancamento>(`${this.lancamentosUrl}`, { lancamento, headers }))
      .then((res: any) => {
        return res;
      })

    return res;
  }

  pesquisar(filtro: LancamentoFiltro) : Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', format(filtro.dataVencimentoInicio, 'yyyy-MM-dd'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', format(filtro.dataVencimentoFim, 'yyyy-MM-dd'));
    }
    
    return firstValueFrom(
      this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params }))
        .then((response: any) => {
          const responseJson = response;
          const lancamentos = responseJson.content;

          const resultado = {
            lancamentos,
            total: responseJson.totalElements
          };

        return resultado;
    })
  }
  
  excluir(id: number): Promise<any> {
    return this.http.delete(`${this.lancamentosUrl}/${id}`, { headers: { 'Authorization' : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' }})
      .toPromise()
      .then(() => null);
  }
}
