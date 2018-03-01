import { Module } from './../../shared/module.model';
import { ModulesService } from './../../shared/module.service';
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
  modulesLoaded = false;
  modules: Module[] = [];
  subscription: Subscription;
  modulesSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modulesService: ModulesService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.usersLoaded.subscribe(
      (value: boolean) => {
        this.usersLoaded = value;
      }
    );
    this.modulesSubscription = this.modulesService.modulesLoaded.subscribe(
      (flag: boolean) => {
        if (flag) {
          this.modulesLoaded = true;
          this.modules = this.modulesService.modules;
        }
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.modulesSubscription.unsubscribe();
  }

  onLogin() {
    this.router.navigate(['login'], {relativeTo: this.route});
  }
}
