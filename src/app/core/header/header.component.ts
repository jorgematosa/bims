import { Module } from './../../shared/module.model';
import { ModulesService } from './../../shared/module.service';
import { Subscription } from 'rxjs';
import { TicketingService } from './../../ticketing/ticketing.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  usersSubscription: Subscription;
  modulesSubscription: Subscription;
  usersLoaded = false;
  modulesLoaded = false;
  modules: Module[];

  constructor(private authService: AuthService, private ticketingService: TicketingService, private modulesService: ModulesService) { }

  ngOnInit() {
    this.usersSubscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        if (flag) {
          this.usersLoaded = true;
        } else {
          this.usersLoaded = false;
        }
      }
    );

    this.modulesSubscription = this.modulesService.modulesLoaded.subscribe(
      (flag: boolean) => {
        if (flag) {
          this.modules = this.modulesService.modules;
          this.modulesLoaded = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.modulesSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onHome() {
    this.ticketingService.home.next(true);
  }
}
