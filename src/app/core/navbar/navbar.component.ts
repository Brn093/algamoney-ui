import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu: boolean = false;
  usuarioLogado: string = ''

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayLoad?.nome;
  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
}
