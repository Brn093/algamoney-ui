import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoas = [];

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  salvar(form: NgForm) {    
    this.pessoaService.adicionar(this.pessoa).then(() => {
      this.messageAdd();
      form.reset();
      this.pessoa = new Pessoa();
    }).catch(erro => this.errorHandler.handle(erro));
  }

  messageAdd() {
    this.messageService.add({severity:'success', summary:'Cadastro realizado'});
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.content.map(p => ({
        label: p.nome, value: p.id
      }));
    
    })
    .catch(error => this.errorHandler.handle(error));
  }

}
