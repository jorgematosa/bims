import { ProjectsService } from './../../../shared/projects.service';
import { AuthService } from './../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketingService } from './../../ticketing.service';
import { Ticket } from './../../ticket.model';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket;
  ticketSelected: number;

  constructor(
    private ticketingService: TicketingService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.ticketSelected = this.ticketingService.ticketSelected;
    this.ticket = this.ticketingService.getTicket(this.ticketSelected);
  }


  onEditTask() {
    this.ticketingService.startEditing(this.ticketSelected);
    this.router.navigate(['../../ticket-edit'], {relativeTo: this.route});
  }

  onGoBack() {
    this.router.navigate(['../tickets-list'], {relativeTo: this.route});
  }

  hasAccess(projectsName: string[]) { // verifica os tickets a que o utilizador tem acesso
    const repProject = this.projectsService.getProjectByName(projectsName[0]);
    const destProject = this.projectsService.getProjectByName(projectsName[1]);
    if (
      (repProject.roleAccess.indexOf(this.authService.loggedUser.role) > -1) ||
      destProject.roleAccess.indexOf(this.authService.loggedUser.role) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
