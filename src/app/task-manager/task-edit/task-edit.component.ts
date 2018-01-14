import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskEditForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.taskEditForm = new FormGroup({
      'name': new FormControl(null),
      'details': new FormControl(null, Validators.required),
      'reporter': new FormControl(null),
      'assignee': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.taskEditForm);
  }

}
