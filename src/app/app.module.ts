import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TicketingComponent } from './ticketing/ticketing.component';
import { InfoManagerComponent } from './info-manager/info-manager.component';
import { PeopleAndProcessesComponent } from './people-and-processes/people-and-processes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TaskManagerComponent,
    TicketingComponent,
    InfoManagerComponent,
    PeopleAndProcessesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
