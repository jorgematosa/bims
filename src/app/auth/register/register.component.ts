import { User } from './../user.model';
import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../shared/data.storage.service';
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
  roles = ['Default', 'Human Resources', 'Development', 'Marketing', 'Administration', 'Quality Management'];
  users: User[];

  constructor(private authService: AuthService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'user': new FormControl(null),
      'role': new FormControl('Default'),
      'email': new FormControl(null),
      'password': new FormControl(null)
    });
    this.users = this.authService.getUsers();
  }

  onRegister() {
    const user = new User(
      this.registerForm.value.user,
      this.registerForm.value.role,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    if (this.authService.userExists(user.username)) {
      if (this.authService.emailExists(user.email)) {
        this.authService.addUsers(user);
        this.dataStorageService.storeUser()
        .subscribe(
          (response: HttpEvent<Object>) => {
            console.log(response);
          }
        );
        this.authService.signupUser(this.registerForm.value.email, this.registerForm.value.password);
        return true;
      }
      console.log('Email already exists');
    }
    console.log('Username already exists');
  }
}
