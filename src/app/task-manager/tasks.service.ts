import { Task } from './task.model';
import { Injectable } from '@angular/core';


@Injectable()
export class TasksService {
  private tasks: Task[] = [
    new Task(4,
      'Fazer Xeeeeeeeeee',
      'Assimwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'joãowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'manelwwwwwwwwwwwwwwwwwwwwwwwww',
      'Open'),
  new Task(6,
    'Fazer Xeeeeeeeeee',
    'Assimwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'joãowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'manelwwwwwwwwwwwwwwwwwwwwwwwww',
    'Open'),
  ];

  getTasks() {
    return this.tasks.slice();
  }
}
