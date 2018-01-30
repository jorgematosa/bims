import { TicketingGuard } from './ticketing/access-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { DataStorageService } from './shared/data.storage.service';
import { AuthService } from './auth/auth.service';
import { TasksService } from './task-manager/tasks.service';
import { DropDownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TicketingComponent } from './ticketing/ticketing.component';
import { InfoManagerComponent } from './info-manager/info-manager.component';
import { PeopleAndProcessesComponent } from './people-and-processes/people-and-processes.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdministrationConsoleComponent } from './administration-console/administration-console.component';
import { TasksComponent } from './task-manager/tasks/tasks.component';
import { TasksBoardComponent } from './task-manager/tasks-board/tasks-board.component';
import { TaskEditComponent } from './task-manager/task-edit/task-edit.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskDetailComponent } from './task-manager/task-detail/task-detail.component';
import { HomeTicketingComponent } from './ticketing/home-ticketing/home-ticketing.component';
import { TicketsExplorerComponent } from './ticketing/tickets-explorer/tickets-explorer.component';
import { TicketEditComponent } from './ticketing/ticket-edit/ticket-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TaskManagerComponent,
    TicketingComponent,
    InfoManagerComponent,
    PeopleAndProcessesComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AdministrationConsoleComponent,
    DropDownDirective,
    TasksComponent,
    TasksBoardComponent,
    TaskEditComponent,
    TaskDetailComponent,
    HomeTicketingComponent,
    TicketsExplorerComponent,
    TicketEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TasksService,
    AuthService,
    AuthGuard,
    TicketingGuard,
    DataStorageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
