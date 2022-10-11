import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { FormControl, NgForm } from '@angular/forms';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  async salvar(form: NgForm) {    
    this.lancamentoService.adicionar(this.lancamento).then(() =>{
      this.messageAdd();
      form.reset();
      this.lancamento = new Lancamento();
    }).catch(erro => this.errorHandler.handle(erro));
  }

  messageAdd() {
    this.messageService.add({severity:'success', summary:'Carro novo'});
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


}
