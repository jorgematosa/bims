import { ProjectsListComponent } from './administration-console/projects-management/projects-list/projects-list.component';
import { ProjectEditComponent } from './administration-console/projects-management/project-edit/project-edit.component';
import { InfoEditComponent } from './info-manager/info-edit/info-edit.component';
import { InfoDetailComponent } from './info-manager/info-detail/info-detail.component';
import { TicketDetailComponent } from './ticketing/tickets-explorer/ticket-detail/ticket-detail.component';
import { TicketsListComponent } from './ticketing/tickets-explorer/tickets-list/tickets-list.component';
import { TicketingGuard } from './ticketing/access-guard.service';
import { TicketEditComponent } from './ticketing/ticket-edit/ticket-edit.component';
import { TicketsExplorerComponent } from './ticketing/tickets-explorer/tickets-explorer.component';
import { HomeTicketingComponent } from './ticketing/home-ticketing/home-ticketing.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AdministrationConsoleComponent } from './administration-console/administration-console.component';
import { TaskDetailComponent } from './task-manager/task-detail/task-detail.component';
import { TaskEditComponent } from './task-manager/task-edit/task-edit.component';
import { TasksBoardComponent } from './task-manager/tasks-board/tasks-board.component';
import { TasksComponent } from './task-manager/tasks/tasks.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { NgModule } from '@angular/core';
import { PeopleAndProcessesComponent } from './people-and-processes/people-and-processes.component';
import { InfoManagerComponent } from './info-manager/info-manager.component';
import { TicketingComponent } from './ticketing/ticketing.component';
import { HomeComponent } from './core/home/home.component';
import { Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './info-manager/info/info.component';

const appRoutes: Routes = [
  { path: '',  component: HomeComponent, children: [
    { path: 'login', component: LoginComponent}
  ]},
  // { path: 'task-manager', loadChildren: './recipes/recipes.module#RecipesModule'},
  { path: 'task-manager', canActivate: [AuthGuard], component: TaskManagerComponent, children: [
    // { path: ':pj/tasks', component: TasksComponent },
    // { path: ':pj/tasks-board', component: TasksBoardComponent },
    // { path: ':pj/task-edit', component: TaskEditComponent}
    { path: 'tasks', component: TasksComponent},
    { path: 'tasks-board', component: TasksBoardComponent},
    { path: 'task-detail', component: TaskDetailComponent},
    { path: 'task-edit', component: TaskEditComponent}
  ]},
  { path: 'ticketing', canActivate: [AuthGuard], component: TicketingComponent, children: [
    { path: 'ticketing-options', component: HomeTicketingComponent},
    { path: 'tickets-explorer', component: TicketsExplorerComponent, children: [
      { path: 'tickets-list', component: TicketsListComponent},
      { path: 'ticket-detail', component: TicketDetailComponent}
    ]},
    { path: 'ticket-edit', component: TicketEditComponent}
  ]},
  { path: 'info-manager', canActivate: [AuthGuard], component: InfoManagerComponent, children: [
    { path: 'info', component: InfoComponent },
    { path: 'info-detail', component: InfoDetailComponent },
    { path: 'info-edit', component: InfoEditComponent }
  ]},
  { path: 'people-and-processes', canActivate: [AuthGuard], component: PeopleAndProcessesComponent},
  // { path: 'user-area', component: PeopleAndProcessesComponent},
  // { path: 'administration', component: PeopleAndProcessesComponent}
  { path: 'administrator', canActivate: [AuthGuard], component: AdministrationConsoleComponent, children: [
    { path: 'register', component: RegisterComponent}, // nest under administration console
    { path: 'project-list', component: ProjectsListComponent },
    { path: 'project-edit', component: ProjectEditComponent }
  ]},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
