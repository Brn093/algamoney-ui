import { HttpClient, HttpParams } from '@angular/common/http';
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
    
          const res = firstValueFrom(this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa, {
            
          }))
            .then((res: any) => {
              return res;
            })
      
          return res;
    }

    pesquisar(filtro: PessoaFiltro): Promise<any> {        
        let params = new HttpParams();

        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
            params = params.set('nome', filtro.nome);
        }    

        return firstValueFrom(
            this.http.get(`${this.pessoasUrl}`, { params }))
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
        return this.http.delete(`${this.pessoasUrl}/${id}`)
          .toPromise()
          .then(() => null);
    }

    mudarStatus(id: number, ativo: boolean): Promise<any> {        
        return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
          .toPromise()
          .then(() => null);
    }

    listarTodas(): Promise<any> {    

        return this.http.get(this.pessoasUrl)
            .toPromise()
            .then(response => response);
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {    
      return firstValueFrom(this.http.put<Lancamento>(`${this.pessoasUrl}/${pessoa.id}`,
          pessoa ))
          .then((response: any) => {    
            return response;
      });
    }

    buscarPorId(id: number): Promise<Pessoa> {
  
      return firstValueFrom(this.http.get(`${this.pessoasUrl}/${id}`))
        .then((response:any) => {  
          return response;
        });
    }
}