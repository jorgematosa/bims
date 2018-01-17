import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../shared/data.storage.service';
import { Project } from './../project.model';
import { Router} from '@angular/router';
import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  subscription: Subscription;
  taskEditForm: FormGroup;
  // editMode = true;
  editedTaskIndex = null;
  task: Task;
  projects: Project[];
  projectSelected: number;

  constructor(private tasksService: TasksService, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.editedTaskIndex = this.tasksService.startedEditing;
    this.initForm();
    this.projects = this.tasksService.getProjects();
    this.projectSelected = this.tasksService.projectSelected;
  }

  onSubmit() {
    const taskForm = this.taskEditForm.value;
    const newTask = new Task(
      this.tasksService.getTasksLength(),
      taskForm.name,
      taskForm.details,
      taskForm.reporter,
      taskForm.assignee,
      'Open', this.projects[this.projectSelected]
    );
    if (this.tasksService.startedEditing !== null) {
      this.tasksService.updateTask(this.editedTaskIndex, newTask);
    } else {
      this.tasksService.addTask(newTask);
    }
    this.editedTaskIndex = null;
    this.tasksService.stopEditing();
    //store tasks in backend
    this.dataStorageService.storeTasks()
    .subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
    //navigate away
    this.router.navigate(['task-manager/task-detail']);
  }

  onCancel() {
    this.editedTaskIndex = null;
    this.tasksService.stopEditing();
    this.router.navigate(['task-manager']);
  }

  private initForm() {
    if (this.editedTaskIndex !== null) {
      this.task = this.tasksService.getTask(this.editedTaskIndex);
      this.taskEditForm = new FormGroup({
        'name': new FormControl(this.task.name, Validators.required),
        'details': new FormControl(this.task.details, Validators.required),
        'reporter': new FormControl(this.task.reporter, Validators.required),
        'assignee': new FormControl(this.task.assignee)
      });
    } else {
      this.taskEditForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'details': new FormControl(null, Validators.required),
        'reporter': new FormControl(null, Validators.required),
        'assignee': new FormControl(null)
      });
    }

  }

}
