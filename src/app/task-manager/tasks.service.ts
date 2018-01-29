import { DataStorageService } from './../shared/data.storage.service';
import { Project } from './project.model';
import { Task } from './task.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class TasksService {
  // declared variables
  private projects: Project[] = [
    new Project('XPTO', 'First Project', ['Administration', 'Human Resources']),
    new Project('Care', 'Second Project', ['Administration', 'Development']),
    new Project('Ruth', 'Third Project', ['Administration', 'Marketing']),
    new Project('Last', 'Fourth Project', ['Administration', 'Quality Management'])
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
  }

  getTask(index: number) {
    return this.tasks[index];
  }

  getProjects() {
    return this.projects.slice();
  }

  getProjectsByRole(role: string) {
    const projects = this.projects.slice();
    const remIndex: number[] = [];

    // gets the index of the items to be removed
    for (const item of projects) {
      if (!item.roleAccess.includes(role)) {
        remIndex.push(projects.indexOf(item));
      }
    }

    // removes the items
    for (let i = remIndex.length - 1; i >= 0; i--) {
      projects.splice(remIndex[i], 1);
    }

    return projects;
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
    for (const project of this.projects) {
      for (const roles of project.roleAccess) {
        if (roles === role) {
          return true;
        }
      }
    }
    return false;
  }
}
