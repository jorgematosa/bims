import { Module } from './module.model';
import { ModulesService } from './module.service';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { InfoManagerService } from './../info-manager/info-manager.service';
import { Info } from './../info-manager/info.model';
import { Ticket } from './../ticketing/ticket.model';
import { TicketingService } from './../ticketing/ticketing.service';
import { User } from './../auth/user.model';
import { Task } from './../task-manager/task.model';
import { TasksService } from './../task-manager/tasks.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';


@Injectable()
export class DataStorageService {
  constructor (
    private httpClient: HttpClient,
    private taskService: TasksService,
    private authService: AuthService,
    private ticketingService: TicketingService,
    private infoManagerService: InfoManagerService,
    private projectsService: ProjectsService,
    private modulesService: ModulesService
  ) {}

  storeModules () { // change the put string to the correspondent firebase backend
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/modules.json', this.modulesService.getModules(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  storeTasks () { // change the put string to the correspondent firebase backend
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/task-manager/tasks.json', this.taskService.getTasks(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  storeProjects () { // change the put string to the correspondent firebase backend
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/projects.json', this.projectsService.getProjects(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  removeProject (index: number) {
    this.httpClient.delete('https://bims-3bf9d.firebaseio.com/projects/' + index + '.json')
    .subscribe(
      (val) => {
          console.log('The project was deleted');
      });
  }

  storeUsers () {
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/users.json', this.authService.getUsers(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  storeTickets () { // change the put string to the correspondent firebase backend
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/ticketing/tickets.json', this.ticketingService.getTickets(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  storeInfos () { // change the put string to the correspondent firebase backend
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/info-manager/infos.json', this.infoManagerService.getInfos(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  getModules() { // change the get string to the correspondent firebase backend
    this.httpClient.get<Module[]>('https://bims-3bf9d.firebaseio.com/modules.json', {
      responseType: 'json'
    })
    .map(
      (modules) => {
        return modules;
      }
    )
    .subscribe(
      (modules: Module[]) => {
        this.modulesService.setModules(modules);
      }
    );
  }

  getTasks() { // change the get string to the correspondent firebase backend
    this.httpClient.get<Task[]>('https://bims-3bf9d.firebaseio.com/task-manager/tasks.json', {
      responseType: 'json'
    })
    .map(
      (tasks) => {
        return tasks;
      }
    )
    .subscribe(
      (tasks: Task[]) => {
        this.taskService.setTasks(tasks);
      }
    );
  }

  getProjects() { // change the get string to the correspondent firebase backend
    this.httpClient.get<Project[]>('https://bims-3bf9d.firebaseio.com/projects.json', {
      responseType: 'json'
    })
    .map(
      (projects) => {
        return projects;
      }
    )
    .subscribe(
      (projects: Project[]) => {
        this.projectsService.setProjects(projects);
      }
    );
  }

  getUsers(email: string) {
    this.httpClient.get<User[]>('https://bims-3bf9d.firebaseio.com/users.json', {
      responseType: 'json'
    })
    .map(
      (users) => {
        return users;
      }
    )
    .subscribe(
      (users: User[]) => {
        this.authService.setUsers(users);
        this.authService.setLoggedUser(this.authService.getUserbyEmail(email));
        this.authService.usersLoaded.next(true);
      },
      error => {
        this.authService.token = null;
        this.authService.usersLoaded.next(false);
      }
    );
  }

  getTickets() { // change the get string to the correspondent firebase backend
    this.httpClient.get<Ticket[]>('https://bims-3bf9d.firebaseio.com/ticketing/tickets.json', {
      responseType: 'json'
    })
    .map(
      (tickets) => {
        return tickets;
      }
    )
    .subscribe(
      (tickets: Ticket[]) => {
        this.ticketingService.setTickets(tickets);
      }
    );
  }

  getInfos() { // change the get string to the correspondent firebase backend
    this.httpClient.get<Info[]>('https://bims-3bf9d.firebaseio.com/info-manager/infos.json', {
      responseType: 'json'
    })
    .map(
      (infos) => {
        return infos;
      }
    )
    .subscribe(
      (infos: Info[]) => {
        this.infoManagerService.setInfos(infos);
      }
    );
  }
}
