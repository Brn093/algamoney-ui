import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    PanelModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
