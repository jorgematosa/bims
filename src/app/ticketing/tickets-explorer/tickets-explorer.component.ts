import { DataStorageService } from './../../shared/data.storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketingService } from './../ticketing.service';
import { User } from './../../auth/user.model';
import { AuthService } from './../../auth/auth.service';
import { Project } from './../../shared/project.model';
import { ProjectsService } from './../../shared/projects.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets-explorer',
  templateUrl: './tickets-explorer.component.html',
  styleUrls: ['./tickets-explorer.component.css']
})
export class TicketsExplorerComponent implements OnInit {
  projects: Project[] = [];
  allProjects: Project[] = [];
  loggedUser: User;
  showAll = true;

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService,
    private ticketingService: TicketingService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.loggedUser = this.authService.loggedUser;
    this.projects = this.projectsService.getProjects();
    this.allProjects = this.projectsService.getProjects();
  }

  onCreateTicket() {
    this.router.navigate(['./../ticket-edit'], {relativeTo: this.route});
  }

  onTicketsShow(project: Project, allProjects: boolean) {
    this.ticketingService.projectSelected.next(project);
    this.ticketingService.showUserTickets.next(false);
    this.ticketingService.userTickets.next(allProjects);
    this.router.navigate(['tickets-list'], {relativeTo: this.route});
  }

  showUserTickets() {
    this.ticketingService.showUserTickets.next(true);
    this.router.navigate(['tickets-list'], {relativeTo: this.route});
  }

  hasAccess(project: Project) {
    if (project === null) {
      return false;
    } else if (project.roleAccess.indexOf(this.authService.loggedUser.role) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
