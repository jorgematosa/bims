import { Project } from './../shared/project.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketingService {
  home: Subject<boolean> = new BehaviorSubject<boolean>(true);
  public projectSelected: Project;
}
