import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { format } from  'date-fns';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';

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

  lancamentosUrl!: string;
  datePipe: any;
  dataVencimentoDe!: Date;
  //lancamentoService: any;
  //grid: any;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }  

  //const today = new Date();
  //console.log(new Intl.DateTimeFormat('pt-BR').format(today));
  //console.log(new Intl.DateTimeFormat('pt-BR').format(this.dataVencimentoDe));
  
  adicionar(lancamento: Lancamento): Promise<Lancamento> {   

    console.log(lancamento);

    const res = firstValueFrom(this.http.post<Lancamento>(`${this.lancamentosUrl}`, lancamento, {
      
    }))
      .then((res: any) => {
        return res;
      })

    return res;
  }

  pesquisar(filtro: LancamentoFiltro) : Promise<any> {
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
      this.http.get(`${this.lancamentosUrl}?resumo`, { params }))
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
    return this.http.delete(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return firstValueFrom(this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`,
      lancamento))
      .then((response: any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }

  buscarPorId(id: number): Promise<Lancamento> {    

    return firstValueFrom(this.http.get(`${this.lancamentosUrl}/${id}`))
      .then((response:any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });
  }


  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
