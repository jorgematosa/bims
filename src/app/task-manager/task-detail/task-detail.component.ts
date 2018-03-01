import { DataStorageService } from './../../shared/data.storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  taskSelected: number;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.taskSelected = this.tasksService.taskSelected;
    this.task = this.tasksService.getTask(this.taskSelected);
  }

  onEditTask() {
    this.tasksService.startEditing(this.taskSelected);
    this.router.navigate(['../task-edit'], {relativeTo: this.route});
  }

  onGoBack() {
    this.router.navigate(['../tasks'], {relativeTo: this.route});
  }

  onDeleteTask() {
    this.dataStorageService.removeTask(this.taskSelected);
    this.router.navigate(['../tasks'], {relativeTo: this.route});
  }

}
