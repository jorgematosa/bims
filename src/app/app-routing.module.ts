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

const appRoutes: Routes = [
  // { path: '',  component: HomeComponent},
  { path: '', component: LoginComponent}, // temporary - redirect to homecomponet
  { path: 'register', component: RegisterComponent}, // nest under AdministrationConsoleModule
  // { path: 'task-manager', loadChildren: './recipes/recipes.module#RecipesModule'},
  { path: 'task-manager', component: TaskManagerComponent, children: [
    // { path: ':pj/tasks', component: TasksComponent },
    // { path: ':pj/tasks-board', component: TasksBoardComponent },
    // { path: ':pj/task-edit', component: TaskEditComponent}
    { path: 'tasks', component: TasksComponent},
    { path: 'tasks-board', component: TasksBoardComponent},
    { path: 'task-detail', component: TaskDetailComponent},
    { path: 'task-edit', component: TaskEditComponent}
  ]},
  { path: 'ticketing', component: TicketingComponent},
  { path: 'info-manager', component: InfoManagerComponent},
  { path: 'people-and-processes', component: PeopleAndProcessesComponent},
  // { path: 'user-area', component: PeopleAndProcessesComponent},
  // { path: 'administration', component: PeopleAndProcessesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
