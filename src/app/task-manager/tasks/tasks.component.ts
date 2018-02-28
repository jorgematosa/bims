import { ProjectsService } from './../../shared/projects.service';
import { DataStorageService } from './../../shared/data.storage.service';
import { Subscription } from 'rxjs/Subscription';
import { Project } from './../../shared/project.model';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OnChanges } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy, OnChanges {
  tasks: Task[];
  projects: Project[];
  projectSelected: number;
  subscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectSelected = this.tasksService.projectSelected;
    this.subscription = this.tasksService.projectSelectedEvent.subscribe(
      (index: number) => {
        this.projectSelected = index;
      }
    );
    this.tasks = this.tasksService.getTasks();
    this.projects = this.projectsService.getProjects();
    // resolução
    // const task = new Task(0, 'Test', 'Test' , 'Low', 'Test', 'Test', 'In Progress', this.projects[0]);
    // this.tasks[8] = task;
    // this.tasksService.setTasks(this.tasks);
  }

  ngOnChanges() {
    this.tasks = this.tasksService.getTasks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelectTask(index: number) {
    this.tasksService.taskSelecting(index);
    this.router.navigate(['../task-detail'], {relativeTo: this.route});
  }

  onEditTask(index: number) {
    this.tasksService.startEditing(index);
    this.router.navigate(['../task-edit'], {relativeTo: this.route});
  }

  newTask() {
    this.router.navigate(['../task-edit'], {relativeTo: this.route});
  }

  showTask(task: Task) {
    if (task === null) {
      return false;
    } else if (task.project.name === this.projects[this.projectSelected].name) {
      return true;
    } else {
      return false;
    }
  }
}
