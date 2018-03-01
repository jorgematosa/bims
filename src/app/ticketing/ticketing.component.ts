import { DataStorageService } from './../shared/data.storage.service';
import { TicketingService } from './ticketing.service';
import { ProjectsService } from './../shared/projects.service';
import { TasksService } from './../task-manager/tasks.service';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../auth/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.css']
})
export class TicketingComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loggedUser: User = null;
  ticketsLoadedSubscription: Subscription;
  ticketsLoaded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private authService: AuthService,
    private ticketingService: TicketingService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        if (flag === true) {
          this.loggedUser = this.authService.getLoggedUser();
        }
      }
    );
    this.dataStorageService.getTickets();

    this.ticketsLoadedSubscription = this.ticketingService.ticketsLoaded.subscribe(
      (flag: boolean) => {
        if (flag) {
          this.ticketsLoaded = true;
          this.router.navigate(['/ticketing/tickets-explorer/tickets-list'], {relativeTo: this.route});
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ticketsLoadedSubscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null) {
      return true;
    } else {
      return false;
    }
  }
}
