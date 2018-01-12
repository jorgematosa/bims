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
      'In Progress'),
    new Task(7,
      'Fazer Xeeeeeeeeee',
      'Assimwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'joãowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      'manelwwwwwwwwwwwwwwwwwwwwwwwww',
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
