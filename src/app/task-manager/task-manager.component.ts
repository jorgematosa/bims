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
  projectSelected = null;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.projects = this.tasksService.getProjects();
  }

  selectProject(project: Project) {
    console.log(project);
    this.projectSelected = project.name;
  }
}
