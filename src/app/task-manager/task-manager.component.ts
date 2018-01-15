import { Project } from './project.model';
import { TasksService } from './tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  projects = [];
  projectSelectedIndex = -1;
  projectSelected = null;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.projects = this.tasksService.getProjects();
    this.projectSelectedIndex = this.tasksService.projectSelected;
  }

  selectProject(project: Project, index: number) {
    this.projectSelected = project.name;
    this.projectSelectedIndex = index;
    this.tasksService.selectProject(index);
  }
}
