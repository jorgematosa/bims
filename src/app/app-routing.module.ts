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
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent}, // nest under AdministrationConsoleModule
  // { path: 'task-manager', loadChildren: './recipes/recipes.module#RecipesModule'},
  { path: 'task-manager', component: TaskManagerComponent},
  { path: 'ticketing', component: TicketingComponent},
  { path: 'info-manager', component: InfoManagerComponent},
  { path: 'people-and-processes', component: PeopleAndProcessesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
