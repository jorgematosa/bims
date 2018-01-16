import { AuthService } from './../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'user': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  onRegister() {
    this.authService.signupUser(this.registerForm.value.email, this.registerForm.value.password);
  }
}
