import { User } from './../auth/user.model';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-administration-console',
  templateUrl: './administration-console.component.html',
  styleUrls: ['./administration-console.component.css']
})
export class AdministrationConsoleComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loggedUser: User = null;
  showAllUA = false;
  showAllPM = false;
  showAllM = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        if (flag === true) {
          this.loggedUser = this.authService.getLoggedUser();
          // this.router.navigate(['ticketing-options'], {relativeTo: this.route});
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null) {
      return true;
    } else {
      return false;
    }
  }

  onRegister() {
    this.authService.updatingUser = false;
    this.authService.updatingUserSub.next(false);
    this.router.navigate(['register'], {relativeTo: this.route});
  }
  onUpdate() {
    this.authService.updatingUser = true;
    this.authService.updatingUserSub.next(true);
    this.router.navigate(['register'], {relativeTo: this.route});
  }

}
