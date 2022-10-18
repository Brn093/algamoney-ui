import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Lancamento, Pessoa } from '../core/model';

export class PessoaFiltro {
    nome!: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    pessoasUrl = 'http://localhost:8080/pessoas';

    constructor(private http: HttpClient) { }

    adicionar(pessoa: Pessoa): Promise<Pessoa> {
        const headers = new HttpHeaders()
          .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
          .append('Content-Type', 'application/json');
    
          const res = firstValueFrom(this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa, {
            headers
          }))
            .then((res: any) => {
              return res;
            })
      
          return res;
    }

    pesquisar(filtro: PessoaFiltro): Promise<any> {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
        let params = new HttpParams();

        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
            params = params.set('nome', filtro.nome);
        }    

        return firstValueFrom(
            this.http.get(`${this.pessoasUrl}`, { headers, params }))
                .then((response: any) => {
                    const responseJson = response;
                    const pessoas = responseJson.content; 

                    const resultado = {
                        pessoas,
                        total: responseJson.totalElements
                    };
                console.log(response);

            return resultado;
        });
    }    

    excluir(id: number): Promise<any> {
        return this.http.delete(`${this.pessoasUrl}/${id}`, { headers: { 'Authorization' : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==' }})
          .toPromise()
          .then(() => null);
    }

    mudarStatus(id: number, ativo: boolean): Promise<any> {        
        return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers: { 'Authorization' : 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==', 'Content-Type' : 'application/json' }})
          .toPromise()
          .then(() => null);
    }

    listarTodas(): Promise<any> {    
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.get(this.pessoasUrl, { headers })
            .toPromise()
            .then(response => response);
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {
        const headers = new HttpHeaders()
          .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
          .append('Content-Type', 'application/json');
    
      return firstValueFrom(this.http.put<Lancamento>(`${this.pessoasUrl}/${pessoa.id}`,
          pessoa, { headers }))
          .then((response: any) => {    
            return response;
      });
    }

    buscarPorId(id: number): Promise<Pessoa> {
      const headers = new HttpHeaders()
        .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  
      return firstValueFrom(this.http.get(`${this.pessoasUrl}/${id}`, { headers }))
        .then((response:any) => {  
          return response;
        });
    }
}