import { Subscription } from 'rxjs/Subscription';
import { Project } from './../project.model';
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

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectSelected = this.tasksService.projectSelected;
    this.subscription = this.tasksService.projectSelectedEvent.subscribe(
      (index: number) => {
        this.projectSelected = index;
      }
    );
    this.tasks = this.tasksService.getTasks();
    this.projects = this.tasksService.getProjects();
  }

  ngOnChanges() {
    this.tasks = this.tasksService.getTasks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditTask(index: number) {
    this.tasksService.startEditing(index);
    this.router.navigate(['../task-edit'], {relativeTo: this.route});
  }

  newTask() {
    this.router.navigate(['../task-edit'], {relativeTo: this.route});
  }
}
