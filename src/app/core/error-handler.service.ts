import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg!: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';
      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { this.messageDelete(msg); }  
    } else {
      this.messageDelete(msg);
    }
  }
  
  messageDelete(msg: any) {
    this.messageService.add({severity:'error', summary:'Erro ao processar o serviço remoto!!!'});
  }
}
