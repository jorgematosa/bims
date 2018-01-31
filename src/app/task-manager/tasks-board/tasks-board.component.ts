import { ProjectsService } from './../../shared/projects.service';
import { DataStorageService } from './../../shared/data.storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Project } from './../../shared/project.model';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.css']
})
export class TasksBoardComponent implements OnInit, OnDestroy, OnChanges {
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
}
