import { User } from './user.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  token: string;
  users: User[] = []; // cannot read property 'length' of undefined

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']); // navigate away
      }
    )
    .catch(
      error => console.log(error) // catches error
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['task-manager']), // navigate away, change when app is complete
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
            }
          );
      } // catch the response to the action
    )
    .catch(
      error => console.log(error) // catches the error
    );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null; // returns the existence of a token
  }

  getUsers() {
    return this.users;
  }

  addUsers(user: User) {
    this.users.push(user);
  }

  userExists(username: string) {
    for (const user of this.users) {
      if (user.getUsername() === username) {
        return false;
      }
    }
    return true;
  }
  emailExists(email: string) {
    for (const user of this.users) {
      if (user.getEmail() === email) {
        return false;
      }
    }
    return true;
  }

}
