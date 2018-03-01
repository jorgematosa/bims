import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.model';
import { Ticket } from './../ticket.model';
import { TicketingService } from './../ticketing.service';
import { HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from './../../shared/projects.service';
import { Project } from './../../shared/project.model';
import { Task } from './../../task-manager/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../../task-manager/tasks.service';
import { DataStorageService } from '../../shared/data.storage.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit, OnDestroy {
  projectSubscription: Subscription;
  ticketEditForm: FormGroup;
  priorities = ['High', 'Medium', 'Low'];
  states = ['Open', 'Under Work', 'Closed'];
  editedTicketIndex = null;
  // tasks: Task;
  ticket: Ticket;
  projects: Project[];
  projectsForOptions: Project[];
  userProjects: Project[];
  loggedUser: User;
  projectSelected: Project;
  editingSubscription: Subscription;
  startedEditingSubscription: Subscription;
  startedEditing: number = null;
  selectedReporter = '';
  selectedAssignee = '';

  constructor(
    private ticketingService: TicketingService,
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    // this.editedTicketIndex = this.ticketingService.startedEditing;
    this.editingSubscription = this.ticketingService.startedEditing.subscribe(
      (index: number) => {
        this.editedTicketIndex = index;
      }
    );
    this.initForm();
    this.loggedUser = this.authService.loggedUser;
    this.projects = this.projectsService.getProjects();
    this.userProjects = this.projectsService.getProjectsByRole(this.loggedUser.role);
    this.projectsForOptions = this.projectsService.getProjectsForOptions();
    this.projectSubscription = this.ticketingService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.startedEditingSubscription = this.ticketingService.startedEditing.subscribe(
      (index: number) => {
        this.startedEditing = index;
      }
    );

  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.editingSubscription.unsubscribe();
    this.startedEditingSubscription.unsubscribe();
  }

  onSubmit() {
    const ticketForm = this.ticketEditForm.value;
    const newTicket = new Ticket(
      this.ticketingService.getTicketsLength() + 1,
      ticketForm.summary,
      ticketForm.description,
      this.projectsService.getProjectByName(ticketForm.ticketReporter) ,
      this.projectsService.getProjectByName(ticketForm.destProject),
      ticketForm.priority,
      ticketForm.state
    );
    if (this.startedEditing !== null) {
      this.ticketingService.updateTicket(this.editedTicketIndex, newTicket);
    } else {
      this.ticketingService.addTicket(newTicket);
      // select created task
      this.ticketingService.createdTicketSelecting();
    }
    this.editedTicketIndex = null;
    this.ticketingService.stopEditing();
    // store tasks in backend
    this.dataStorageService.storeTickets()
    .subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
        // navigate away
    this.router.navigate(['ticketing/tickets-explorer/ticket-detail']);
  }

  onCancel() {
    this.editedTicketIndex = null;
    this.ticketingService.stopEditing();
    this.ticketingService.showUserTickets.next(true);
    this.router.navigate(['../tickets-explorer/tickets-list'], {relativeTo: this.route});
  }

  private initForm() {
    if (this.editedTicketIndex !== null) {
      this.ticket = this.ticketingService.getTicket(this.editedTicketIndex);
      this.selectedReporter = this.ticket.ticketReporter.name;
      this.selectedAssignee = this.ticket.destProject.name;
      this.ticketEditForm = new FormGroup({
        'summary': new FormControl(this.ticket.summary, Validators.required),
        'description': new FormControl(this.ticket.description, Validators.required),
        'ticketReporter': new FormControl(this.ticket.ticketReporter.name, Validators.required),
        'destProject': new FormControl(this.ticket.destProject.name, Validators.required),
        'priority': new FormControl(this.ticket.priority, Validators.required),
        'state': new FormControl(this.ticket.state)
      });
    } else {
      this.ticketEditForm = new FormGroup({
        'summary': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'ticketReporter': new FormControl(null, Validators.required),
        'destProject': new FormControl(null, Validators.required),
        'priority': new FormControl('Low', Validators.required),
        'state': new FormControl('Open')
      });
    }
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
