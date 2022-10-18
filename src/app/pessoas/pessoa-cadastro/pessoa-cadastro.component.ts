import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
    private messageService: MessageService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];
    this.title.setTitle('Nova pessoa');

    if (idPessoa && idPessoa !== 'novo') {
      this.carregarPessoa(idPessoa)
    }

    this.carregarPessoas();
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      }).catch(erro => this.errorHandler.handle(erro));
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

  atualizarLancamento(form: NgForm) {    
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;        
        this.messageService.add({severity:'success', summary:'Lancamento alterado com sucesso!'});    
        this.atualizarTituloEdicao();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  novo(form: NgForm) {
    form.reset();
    
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.title.setTitle('Cadastrar Nova Pessoa');
    this.router.navigate(['/pessoas/novo']);
  }
}
