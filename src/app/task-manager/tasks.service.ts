import { ProjectsService } from './../shared/projects.service';
import { Project } from './../shared/project.model';
import { DataStorageService } from './../shared/data.storage.service';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class TasksService {
  // declared variables

  private tasks: Task[];

  startedEditing = null;
  startedEditingEvent = new Subject<number>();
  projectSelected = -1;
  projectSelectedEvent = new Subject<number>();
  taskSelected = -1;

  constructor(private projectsService: ProjectsService) {}

  // output and input functions
  getTasks() {
    return this.tasks.slice();
  }

  getTasksLength() {
    return this.tasks.length;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  getTask(index: number) {
    return this.tasks[index];
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
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

  createdTaskSelecting() {
    this.taskSelected = this.tasks.length - 1;
  }

  roleExists(role: string) {
    const projects = this.projectsService.getProjects();
    for (const project of projects) {
      for (const roles of project.roleAccess) {
        if (roles === role) {
          return true;
        }
      }
    }
    return false;
  }
}
