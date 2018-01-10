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

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyABrMjW8wNCzNAyHz8JOh2zVjtcOorhEgI',
      authDomain: 'https://bims-3bf9d.firebaseio.com/'
    });
  }
}
