import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../../auth/user.model';
import { AuthService } from './../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ProjectsService } from './../../../shared/projects.service';
import { TicketingService } from './../../ticketing.service';
import { Project } from './../../../shared/project.model';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Ticket } from '../../ticket.model';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit, OnDestroy, OnChanges {
  projectSelected: Project;
  allProjectsTickets: boolean;
  showUserTickets = true;
  loggedUser: User;
  projects: Project[] = [];
  tickets: Ticket[] = [];
  subscription: Subscription;
  userTicketsSubscription: Subscription;
  allUserTicketsSubscription: Subscription;
  assignedTickets = true;
  openedTickets = false;

  constructor(
    private ticketingService: TicketingService,
    private projectsService: ProjectsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
    this.allUserTicketsSubscription = this.ticketingService.userTickets.subscribe(
      (flag: boolean) => {
        this.allProjectsTickets = flag;
      }
    );
    this.loggedUser = this.authService.loggedUser;
    this.projects = this.projectsService.getProjects();
    this.tickets = this.ticketingService.getTickets();
  }

  ngOnChanges() {
    this.tickets = this.ticketingService.getTickets();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userTicketsSubscription.unsubscribe();
    this.allUserTicketsSubscription.unsubscribe();
  }

  hasAccess(roleAccess: string[]) { // verifica os tickets a que o utilizador tem acesso
    if (roleAccess.indexOf(this.loggedUser.role) > -1) {
      return true;
    } else {
      return false;
    }
  }

  onAssignedTickets() {
    this.assignedTickets = true;
    this.openedTickets = false;
  }

  onOpenedTickets() {
    this.assignedTickets = false;
    this.openedTickets = true;
  }

  onSelectTicket(index: number) {
    this.ticketingService.ticketSelection(index);
    this.router.navigate(['../ticket-detail'], {relativeTo: this.route});
  }

  onEditTicket(index: number) {
    this.ticketingService.startEditing(index);
    this.router.navigate(['../../ticket-edit'], {relativeTo: this.route});
  }
}