import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Project } from '../shared/project.model';

@Injectable()
export class InfoManagerService {
  projectSelected: Subject<Project> = new BehaviorSubject<Project>(null);

}
