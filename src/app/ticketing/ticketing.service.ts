import { ProjectsService } from './../shared/projects.service';
import { Ticket } from './ticket.model';
import { Project } from './../shared/project.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketingService {
  projectSelected: Subject<Project> = new BehaviorSubject<Project>(null);
  showUserTickets: Subject<boolean> = new BehaviorSubject<boolean>(true);
  userTickets: Subject<boolean> = new BehaviorSubject<boolean>(true);
  projects: Project[] =  this.projectsService.getProjects();
  startedEditing: Subject<number> = new BehaviorSubject<number>(null);
  ticketSelected: number;
  ticketsLoaded: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private projectsService: ProjectsService) {}

  tickets: Ticket[] = [];

  getTickets() {
    return this.tickets.slice();
  }
  getTicketsLength() {
    return this.tickets.length;
  }

  getTicket(index: number) {
    return this.tickets[index];
  }

  setTickets(tickets: Ticket[]) {
    this.tickets = tickets;
    this.ticketsLoaded.next(true);
  }

  startEditing(index: number) {
    this.startedEditing.next(index);
  }

  stopEditing() {
    this.startedEditing.next(null);
  }

  updateTicket(index: number, ticket: Ticket) {
    this.tickets[index].summary = ticket.summary;
    this.tickets[index].description = ticket.description;
    this.tickets[index].ticketReporter = ticket.ticketReporter;
    this.tickets[index].destProject = ticket.destProject;
    this.tickets[index].priority = ticket.priority;
    this.tickets[index].state = ticket.state;
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  ticketSelection(index: number) {
    this.ticketSelected = index;
  }

  createdTicketSelecting() {
    this.ticketSelected = this.tickets.length - 1;
  }

  roleExists(role: string) {
    const projects = this.projectsService.getProjects();
    for (const project of projects) {
      for (const roles of project.roleAccess) {
        if (roles === role) {
          return true;
        }
      }
    }
    return false;
  }
}
