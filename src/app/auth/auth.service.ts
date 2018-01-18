import { Subject } from 'rxjs/Subject';
import { DataStorageService } from './../shared/data.storage.service';
import { User } from './user.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  token: string;
  users: User[] = []; // cannot read property 'length' of undefined
  loggedUser: User = null;
  updatingUser = false;
  updatingUserSub = new Subject<boolean>();

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
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
            }
          );
          setTimeout(
            () => {
              this.router.navigate(['/']); // navigate away, change when app is complete
            }, 1200
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
    this.loggedUser = null;
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

  setUsers(users: User[]) {
    this.users = users;
  }

  setLoggedUser(user: User) {
    this.loggedUser = user;
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  getUserbyEmail(email: string) {
    for (const user of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  public getUserIndexbyEmail(email: string) {
    let flag = null;
    this.users.forEach(
      (user, index) => {
        if (user.email === email) {
          flag = index;
        }
      }
    );
    return flag;
  }

  addUsers(user: User) {
    this.users.push(user);
  }

  updateUser(index: number, user: User) {
    const user_fire = firebase.auth().currentUser;

    this.users[index] = user;

    user_fire.updateEmail(user.email).then(function() {
    }).catch(function(error) {
    });

    user_fire.updatePassword(user.password).then(function() {
    }).catch(function(error) {
});
    this.router.navigate(['/']); // navigate away
    console.log('The user was updated');
  }

  userExists(username: string) {
    for (const user of this.users) {
      if (user.username === username) {
        return false;
      }
    }
    return true;
  }

  emailExists(email: string) {
    for (const user of this.users) {
      if (user.email === email) {
        return false;
      }
    }
    return true;
  }

}
