import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Project } from '../shared/project.model';
import { Info } from './info.model';
import { ProjectsService } from '../shared/projects.service';

@Injectable()
export class InfoManagerService {
  projectSelected: Subject<Project> = new BehaviorSubject<Project>(null);
  currentSection: Subject<string> = new BehaviorSubject<string>(null);
  projects: Project[] = this.projectsService.getProjects();

  constructor(private projectsService: ProjectsService) {
  }

  private infos: Info[] = [
    new Info('test@test.com', 'adminadmin', 'Admin user', this.projects[0], 'Passwords'),
    new Info('test_hrn@test.com', 'adminadmin123', 'Human Resources user', this.projects[0], 'Passwords'),
    new Info('test info', 'test', 'nothing to show', this.projects[0], 'Programas'),
    new Info('TESTE_PASS', 'TESTE', 'NOTHING TO SHOW', this.projects[1], 'Passwords')
  ];

  getInfos() {
    return this.infos.slice();
  }
}
