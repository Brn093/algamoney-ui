import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private messageService: MessageService,
    ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => {
        this.messageAdd();
        this.errorHandler.handle(erro);
      });
  }

  messageAdd() {
    this.messageService.add({severity:'error', summary:'Usuário ou senha inválidos'});
  }
}