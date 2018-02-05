import { ProjectsService } from './../../shared/projects.service';
import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../shared/data.storage.service';
import { Project } from './../../shared/project.model';
import { Router} from '@angular/router';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  taskEditForm: FormGroup;
  priorities = ['High', 'Medium', 'Low'];
  states = ['Open', 'In Progress', 'Done', 'Closed'];
  editedTaskIndex = null;
  task: Task;
  projects: Project[];
  projectSelected: number;

  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private router: Router,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.editedTaskIndex = this.tasksService.startedEditing;
    this.initForm();
    this.projects = this.projectsService.getProjects();
    this.projectSelected = this.tasksService.projectSelected;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const taskForm = this.taskEditForm.value;
    const newTask = new Task(
      this.tasksService.getTasksLength() + 1,
      taskForm.name,
      taskForm.details,
      taskForm.priority,
      taskForm.reporter,
      taskForm.assignee,
      taskForm.state, this.projects[this.projectSelected],

    );
    if (this.tasksService.startedEditing !== null) {
      this.tasksService.updateTask(this.editedTaskIndex, newTask);
    } else {
      this.tasksService.addTask(newTask);
      // select created task
      this.tasksService.createdTaskSelecting();
    }
    this.editedTaskIndex = null;
    this.tasksService.stopEditing();
    // store tasks in backend
    this.dataStorageService.storeTasks()
    .subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
        // navigate away
    this.router.navigate(['task-manager/task-detail']);
  }

  onCancel() {
    this.editedTaskIndex = null;
    this.tasksService.stopEditing();
    this.router.navigate(['task-manager/tasks']);
  }

  private initForm() {
    if (this.editedTaskIndex !== null) {
      this.task = this.tasksService.getTask(this.editedTaskIndex);
      this.taskEditForm = new FormGroup({
        'name': new FormControl(this.task.name, Validators.required),
        'details': new FormControl(this.task.details, Validators.required),
        'priority': new FormControl(this.task.priority, Validators.required),
        'state': new FormControl(this.task.state, Validators.required),
        'reporter': new FormControl(this.task.reporter, Validators.required),
        'assignee': new FormControl(this.task.assignee)
      });
    } else {
      this.taskEditForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'details': new FormControl(null, Validators.required),
        'priority': new FormControl('Low', Validators.required),
        'state': new FormControl('Open', Validators.required),
        'reporter': new FormControl(null, Validators.required),
        'assignee': new FormControl(null)
      });
    }

  }

}
