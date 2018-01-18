import { User } from './auth/user.model';
import { DataStorageService } from './shared/data.storage.service';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
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
    .filter(it => it.startsWith('firebase:authUser'))[1];
    const authToken = JSON.parse(localStorage.getItem(tokenKey)).stsTokenManager.accessToken;
    this.authService.token = authToken;
    console.log(this.authService.isAuthenticated());
    console.log('token velho');
    console.log(authToken);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        this.loggedUserEmail = user.email;
      }
    });

    setTimeout(
      () => {
        console.log('ENTROU');
        console.log(firebase.auth().currentUser.email);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              // this.authService.token = token;
              console.log('token novo');
              console.log(token);
            }
          );
        this.dataStorageService.getUsers(this.loggedUserEmail);
      }, 1200
    );

    // test
  }
}
