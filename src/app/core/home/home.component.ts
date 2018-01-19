import { AuthService } from './../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLogin() {
    this.router.navigate(['login'], {relativeTo: this.route});
  }

  isAuthenticated () {
    return this.authService.isAuthenticated();
  }
}
