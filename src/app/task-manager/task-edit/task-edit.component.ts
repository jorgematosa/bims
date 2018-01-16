import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editedTaskIndex = this.tasksService.startedEditing;
    this.initForm();
  }

  onSubmit() {
    const taskForm = this.taskEditForm.value;
    const newTask = new Task(
      this.tasksService.getTasksLength(), taskForm.name, taskForm.details, taskForm.reporter, taskForm.assignee, 'Open'
    );
    if (this.tasksService.startedEditing !== null) {
      this.tasksService.updateTask(this.editedTaskIndex, newTask);
    } else {
      this.tasksService.addTask(newTask);
    }
    this.editedTaskIndex = null;
    this.tasksService.stopEditing();
    this.router.navigate(['../tasks'], {relativeTo: this.route });
  }

  onCancel() {
    this.editedTaskIndex = null;
    this.tasksService.stopEditing();
    this.router.navigate(['../tasks'], {relativeTo: this.route });
  }

  private initForm() {
    if (this.editedTaskIndex !== null) {
      this.task = this.tasksService.getTask(this.editedTaskIndex);
      this.taskEditForm = new FormGroup({
        'name': new FormControl(this.task.name),
        'details': new FormControl(this.task.details, Validators.required),
        'reporter': new FormControl(this.task.reporter),
        'assignee': new FormControl(this.task.assignee)
      });
    } else {
      this.taskEditForm = new FormGroup({
        'name': new FormControl(null),
        'details': new FormControl(null, Validators.required),
        'reporter': new FormControl(null),
        'assignee': new FormControl(null)
      });
      console.log(this.editedTaskIndex);
    }

  }

}
