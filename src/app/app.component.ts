import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

class Cliente {
  nome!: string;
  email!: string;
  profissao = '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor(
    private config: PrimeNGConfig, 
    private translateService: TranslateService,
    private router: Router    
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng')
      .subscribe(res => this.config.setTranslation(res));
  }

  cliente = new Cliente();
  profissoes = ['Programador', 'Empresário', 'Outra'];

  salvar(form: NgForm) {
    // this.cliente.nome = form.value.primeiroNome;
    // this.cliente.email = form.value.emailAddress;
    // this.cliente.profissao = form.value.profissao;

    console.log(form);
    //form.reset({ primeiroNome: 'Sebastião', profissao: '' });
    // console.log(this.cliente);
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }
}