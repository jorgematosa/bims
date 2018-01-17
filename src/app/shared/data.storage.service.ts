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


@Injectable()
export class DataStorageService {
  constructor (private httpClient: HttpClient, private taskService: TasksService, private authService: AuthService) {}

  storeTasks () { // change the put string to the correspondent firebase backend
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/task-manager/tasks.json', this.taskService.getTasks(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  storeUser () {
    const req = new HttpRequest('PUT', 'https://bims-3bf9d.firebaseio.com/users.json', this.authService.getUsers(), {
      reportProgress: true,
    });
    return this.httpClient.request(req);
  }

  getTasks() { // change the get string to the correspondent firebase backend
    this.httpClient.get<Task[]>('https://bims-3bf9d.firebaseio.com/task-manager/tasks.json', {
      responseType: 'json'  // response type
    })
    .map(
      (tasks) => {
        for (const task of tasks) {
          if (!task['ingredients']) {
            task['ingredients'] = [];
          }
        }
        return tasks;
      }
    )
    .subscribe(
      (tasks: Task[]) => {
        this.taskService.setTasks(tasks);
      }
    );
  }
}
