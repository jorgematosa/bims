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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loggedUser = this.authService.loggedUser;
    this.projects = this.projectsService.getProjectsByRole(this.loggedUser.role);
    this.allProjects = this.projectsService.getProjects();
  }

  onCreateTicket() {
    this.ticketingService.home.next(false);
    this.router.navigate(['./ticket-edit'], {relativeTo: this.route});
  }

  onTicketsShow(project: Project) {
    this.ticketingService.projectSelected = project;
    this.router.navigate(['tickets-list'], {relativeTo: this.route});
  }
}
