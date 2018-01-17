import { DataStorageService } from './../../shared/data.storage.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  onLogin() {
    this.authService.signinUser(this.loginForm.value.email, this.loginForm.value.password);
    setTimeout(
      () => {
        this.dataStorageService.getUsers(this.loginForm.value.email);
      }, 1000
    );
  }
}
