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
  homeSubscription: Subscription;
  loggedUser: User = null;
  home: boolean;

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

    this.homeSubscription = this.ticketingService.home.subscribe(
      (flag: boolean) => {
        this.home = flag;
      }
    );
    this.dataStorageService.getTickets();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.homeSubscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null) {
      return true;
    } else {
      return false;
    }
  }

  onSearchTickets() {
    this.ticketingService.home.next(false);
    this.router.navigate(['./tickets-explorer/tickets-list'], {relativeTo: this.route});
  }

  onCreateTicket() {
    this.ticketingService.home.next(false);
    this.router.navigate(['./ticket-edit'], {relativeTo: this.route});
  }
}
