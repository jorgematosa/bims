import { Project } from './../shared/project.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketingService {
  home: Subject<boolean> = new BehaviorSubject<boolean>(true);
  projectSelected: Subject<Project> = new BehaviorSubject<Project>(null);
  showUserTickets: Subject<boolean> = new BehaviorSubject<boolean>(false);
  userTickets: Subject<boolean> = new BehaviorSubject<boolean>(true);
}
