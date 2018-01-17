import { DataStorageService } from './../shared/data.storage.service';
import { Project } from './project.model';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class TasksService {
  // declared variables
  private projects: Project[] = [
    new Project('XPTO', 'First Project'),
    new Project('Care', 'Second Project'),
    new Project('Ruth', 'Third Project'),
    new Project('Last', 'Fourth Project')
  ];

  private tasks: Task[];

  startedEditing = null;
  startedEditingEvent = new Subject<number>();
  projectSelected = -1;
  projectSelectedEvent = new Subject<number>();
  taskSelected = -1;

  // output and input functions
  getTasks() {
    return this.tasks.slice();
  }

  getTasksLength() {
    return this.tasks.length;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    console.log(tasks);
    console.log(this.tasks);
  }

  getTask(index: number) {
    console.log(this.tasks[index]);
    return this.tasks[index];
  }

  getProjects() {
    return this.projects.slice();
  }

  startEditing(index: number) {
    this.startedEditing = index;
    this.startedEditingEvent.next(index);
  }

  stopEditing() {
    this.startedEditing = null;
    this.startedEditingEvent.next(null);
  }

  updateTask(index: number, task: Task) {
    this.tasks[index].name = task.name;
    this.tasks[index].details = task.details;
    this.tasks[index].priority = task.priority;
    this.tasks[index].state = task.state;
    this.tasks[index].reporter = task.reporter;
    this.tasks[index].assignee = task.assignee;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  selectProject(index: number) {
    this.projectSelected = index;
    this.projectSelectedEvent.next(index);
  }

  taskSelecting(index: number) {
    this.taskSelected = index;
  }
}
