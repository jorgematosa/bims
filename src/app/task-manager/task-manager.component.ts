import { Subscription } from 'rxjs/Subscription';
import { Project } from './project.model';
import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit, OnDestroy {
  projects = [];
  projectSelectedIndex = -1;
  projectSelected = null;
  startedEditing = null;
  subscription: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.projects = this.tasksService.getProjects();
    this.projectSelectedIndex = this.tasksService.projectSelected;
    this.tasksService.selectProject(this.projectSelectedIndex);
    this.subscription = this.tasksService.startedEditingEvent.subscribe(
      (index: number) => {
        this.startedEditing = index;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectProject(project: Project, index: number) {
    this.projectSelected = project.name;
    this.projectSelectedIndex = index;
    this.tasksService.selectProject(index);
  }
}
