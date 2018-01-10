import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'user': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  onRegister() {
    console.log(this.registerForm);
  }
}
