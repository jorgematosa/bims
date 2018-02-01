import { User } from './../../../auth/user.model';
import { AuthService } from './../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ProjectsService } from './../../../shared/projects.service';
import { TicketingService } from './../../ticketing.service';
import { Project } from './../../../shared/project.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ticket } from '../../ticket.model';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit, OnDestroy {
  projectSelected: Project;
  showUserTickets: boolean;
  loggedUser: User;
  projects: Project[] = [];
  tickets: Ticket[] = [];
  subscription: Subscription;
  userTicketsSubscription: Subscription;

  constructor(private ticketingService: TicketingService, private projectsService: ProjectsService, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.ticketingService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.userTicketsSubscription = this.ticketingService.showUserTickets.subscribe(
      (flag: boolean) => {
        this.showUserTickets = flag;
      }
    );
    this.loggedUser = this.authService.loggedUser;
    this.projects = this.projectsService.getProjects();
    this.tickets.push(new Ticket(12, 'first ticket', 'first ticket description', this.projects[0]));
    this.tickets.push(new Ticket(12, 'second ticket', 'second ticket description', this.projects[0]));
    this.tickets.push(new Ticket(12, 'third ticket', 'third ticket description', this.projects[1]));
    this.tickets.push(new Ticket(12, 'fourth ticket', 'fourth ticket description', this.projects[2]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userTicketsSubscription.unsubscribe();
  }

  hasAccess(roleAccess: string[]) { // verifica os tickets a que o utilizador tem acesso
    if (roleAccess.indexOf(this.loggedUser.role) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
