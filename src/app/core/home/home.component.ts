import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  usersLoaded = false;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.authService.usersLoaded.subscribe(
      (value: boolean) => {
        console.log(value);
        this.usersLoaded = value;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogin() {
    this.router.navigate(['login'], {relativeTo: this.route});
  }
}
