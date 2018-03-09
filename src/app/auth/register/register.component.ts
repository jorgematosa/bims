import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../user.model';
import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../shared/data.storage.service';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  roles = ['Default', 'Human Resources', 'Development', 'Marketing', 'Administration', 'Quality Management'];
  users: User[];
  subscription: Subscription;
  updatingUser: boolean;

  constructor(
    private authService: AuthService, private dataStorageService: DataStorageService, private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.updatingUser = this.authService.updatingUser;
    this.initForm();
    this.users = this.authService.getUsers();
    this.subscription = this.authService.updatingUserSub.subscribe(
      (flag: boolean) => {
        this.initForm();
        this.updatingUser = flag;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  initForm() {
    if (this.authService.updatingUser) {
      this.registerForm = new FormGroup({
        'user': new FormControl(this.authService.loggedUser.username),
        'role': new FormControl(this.authService.loggedUser.role),
        'email': new FormControl(this.authService.loggedUser.email),
        'password': new FormControl(this.authService.loggedUser.password)
      });
    } else {
      this.registerForm = new FormGroup({
        'user': new FormControl(null),
        'role': new FormControl('Default'),
        'email': new FormControl(null),
        'password': new FormControl(null)
      });
    }
  }

  storeUsersSub() {
    this.dataStorageService.storeUsers()
    .subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
  }
  onRegister() {
    const user = new User(
      this.registerForm.value.user,
      this.registerForm.value.role,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    // updating user
    if (this.authService.updatingUser) {
      const userIndex = this.authService.getUserIndexbyEmail(this.authService.loggedUser.email);
      const updatedUser = this.authService.users[userIndex];

      if (updatedUser.username === this.registerForm.value.user && updatedUser.email === this.registerForm.value.email) {
        this.authService.updateUser(userIndex, user);
        this.storeUsersSub();
        this.authService.updatingUser = false;
        this.authService.updatingUserSub.next(false);
        this.authService.logout();
        return true;
      }
      if (updatedUser.username !== this.registerForm.value.user && updatedUser.email !== this.registerForm.value.email) {
        if (this.authService.userExists(user.username)) {
          if (this.authService.emailExists(user.email)) {
            this.authService.updateUser(userIndex, user);
            this.storeUsersSub();
            this.authService.updatingUser = false;
            this.authService.updatingUserSub.next(false);
            this.authService.logout();
            return true;
          }
        }
        console.log('User or Email already exist');
      }
      if (updatedUser.username === this.registerForm.value.user && updatedUser.email !== this.registerForm.value.email) {
        if (this.authService.emailExists(user.email)) {
          this.authService.updateUser(userIndex, user);
          this.storeUsersSub();
          this.authService.updatingUser = false;
          this.authService.updatingUserSub.next(false);
          this.authService.logout();
          return true;
        }
        console.log('Email already Exists');
      }
      if (updatedUser.username !== this.registerForm.value.user && updatedUser.email === this.registerForm.value.email) {
        if (this.authService.userExists(user.username)) {
          this.authService.updateUser(userIndex, user);
          this.storeUsersSub();
          this.authService.updatingUser = false;
          this.authService.updatingUserSub.next(false);
          this.authService.logout();
          return true;
        }
        console.log('User already exists');
      }
    }
    // registering a new user
    if (!this.authService.updatingUser) {
      if (this.authService.userExists(user.username)) {
        if (this.authService.emailExists(user.email)) {
          this.authService.addUsers(user);
          this.storeUsersSub();
          this.authService.signupUser(this.registerForm.value.email, this.registerForm.value.password);
          return true;
        }
        console.log('Email already exists');
      }
      console.log('Username already exists');
    }
  }

  onCancel() {
    this.authService.updatingUser = false;
    this.authService.updatingUserSub.next(false);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
