import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { FormControl, NgForm } from '@angular/forms';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  dateValue!: Date;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [];
  
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    const idLancamento = this.route.snapshot.params['id'];    

    if (idLancamento && idLancamento !== 'novo') {
      this.carregarLancamento(idLancamento)
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {
        this.lancamento = lancamento;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if(this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;        
        this.messageService.add({severity:'success', summary:'Lancamento alterado com sucesso!'});    
      }).catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(form: NgForm) {    
    this.lancamentoService.adicionar(this.lancamento).then(() =>{
      this.messageAdd();
      form.reset();
      this.lancamento = new Lancamento();
    }).catch(erro => this.errorHandler.handle(erro));
  }

  messageAdd() {
    this.messageService.add({severity:'success', summary:'Cadastro realizado'});
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => 
          ({
            label: c.nome,
            value: c.id
          })
        );
      }).catch(erro => this.errorHandler.handle(erro));
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

  get editando() {
    return Boolean(this.lancamento.id);
  }

}
