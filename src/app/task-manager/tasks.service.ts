import { Task } from './task.model';
import { Injectable } from '@angular/core';


@Injectable()
export class TasksService {
  private tasks: Task[] = [
    new Task(4,
      'Fazer Xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      'Assimwwwwwww wwwwwwwwwwwwwwwwww wwwwwwwww wwwwwwwww',
      'joãowww wwwwwwwww wwwwwwwwwwwww wwwwwwwwwwwwww',
      'manelwwwww wwwwwwwww wwwwwwwwwww',
      'Open'),
    new Task(6,
      'Fazer Xeeeeeeeeee',
      'Assimwwwwww wwwwwwwwwwww wwwwwwwwwwwwwwww wwwwwwwww',
      'joãowwwwwwwwwwwwww wwwwwwwwwwwwww wwwwwwwwwww',
      'manelwwwww wwwwwwwwwwwwwwww wwww',
      'In Progress'),
    new Task(7,
      'Fazer Xeeeeeeeeee',
      'Assimwwwww wwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwww',
      'joãowwwwwwwwwwwwwwwwww wwwwwwwwwwww wwwwwwwww',
      'manelwwwwww wwwwwwwwwwwwwwwwwww',
      'Open'),
    new Task(8,
      'Fazer Xeeeeeeeeee',
      'Assimwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'joãowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'manelwwwwwwwwwwwwwwwwwwwwwwwww',
      'Done'),
    new Task(9,
      'Fazer Xeeeeeeeeee',
      'Assimwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'joãowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'manelwwwwwwwwwwwwwwwwwwwwwwwww',
      'Closed')
  ];

  getTasks() {
    return this.tasks.slice();
  }
}
