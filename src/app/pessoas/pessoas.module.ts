import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    DialogModule,
    InputMaskModule,
    TableModule,
    SharedModule,
    PessoasRoutingModule
  ],
  exports: [
  ]
})
export class PessoasModule { }
