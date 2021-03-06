import { ModulesService } from './shared/module.service';
import { Subscription } from 'rxjs/Subscription';
import { TasksService } from './task-manager/tasks.service';
import { User } from './auth/user.model';
import { DataStorageService } from './shared/data.storage.service';
import { AuthService } from './auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loggedUserEmail: string;


  constructor(private authService: AuthService, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyABrMjW8wNCzNAyHz8JOh2zVjtcOorhEgI',
      authDomain: 'https://bims-3bf9d.firebaseio.com/',
    });

    this.verifyToken();

  }

  verifyToken() {
    // persistent login
    const tokenKey = Object.keys(window.localStorage)
    .filter(it => it.startsWith('firebase:authUser'))[1]; // change to [0] in AWS
    if (tokenKey) {
      const authToken = JSON.parse(localStorage.getItem(tokenKey)).stsTokenManager.accessToken;
      this.authService.token = authToken;
      console.log(this.authService.token);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedUserEmail = user.email;
        }
      });

      setTimeout(
        () => {
          this.dataStorageService.getModules();
          this.dataStorageService.getUsers(this.loggedUserEmail);
          this.dataStorageService.getProjects();
        }, 1200
      );
    } else {
      this.authService.usersLoaded.next(false);
    }
  }
}
