import { UserRolesService } from './shared/user-roles.service';
import { TicketingService } from './ticketing/ticketing.service';
import { ProjectsService } from './shared/projects.service';
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
import { TicketsListComponent } from './ticketing/tickets-explorer/tickets-list/tickets-list.component';
import { TicketDetailComponent } from './ticketing/tickets-explorer/ticket-detail/ticket-detail.component';
import { InfoManagerService } from './info-manager/info-manager.service';
import { InfoComponent } from './info-manager/info/info.component';
import { InfoEditComponent } from './info-manager/info-edit/info-edit.component';
import { InfoDetailComponent } from './info-manager/info-detail/info-detail.component';
import { ProjectEditComponent } from './administration-console/projects-management/project-edit/project-edit.component';
import { ProjectDeleteComponent } from './administration-console/projects-management/project-delete/project-delete.component';
import { ProjectAccessComponent } from './administration-console/projects-management/project-access/project-access.component';
import { ProjectInfoManagerSectionsComponent } from './administration-console/projects-management/project-info-manager-sections/project-info-manager-sections.component';
import { ProjectsListComponent } from './administration-console/projects-management/projects-list/projects-list.component';
import { MatFormFieldModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    TicketEditComponent,
    TicketsListComponent,
    TicketDetailComponent,
    InfoComponent,
    InfoEditComponent,
    InfoDetailComponent,
    ProjectEditComponent,
    ProjectDeleteComponent,
    ProjectAccessComponent,
    ProjectInfoManagerSectionsComponent,
    ProjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule
  ],
  providers: [
    TasksService,
    ProjectsService,
    TicketingService,
    InfoManagerService,
    AuthService,
    AuthGuard,
    TicketingGuard,
    DataStorageService,
    UserRolesService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
