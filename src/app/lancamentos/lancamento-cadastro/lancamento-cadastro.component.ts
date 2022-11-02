import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  formulario!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){
    this.configurarFormulario();

    const idLancamento = this.route.snapshot.params['id'];
    
    this.title.setTitle('Novo lançamento');

    if (idLancamento && idLancamento !== 'novo') {
      this.carregarLancamento(idLancamento)
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      }).catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if(this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  atualizarLancamento() {    
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.messageService.add({severity:'success', summary:'Lancamento alterado com sucesso!'});    
        this.atualizarTituloEdicao();        
      }).catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento() {    
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado =>{
      this.messageAdd();
      //form.reset();
      //this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.id]);
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
    return Boolean(this.formulario.get('id')?.value);
  }

  novo() {
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')}`);
  }
}
