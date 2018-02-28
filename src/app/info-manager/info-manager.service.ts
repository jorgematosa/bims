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
  startedEditing: Subject<number> = new BehaviorSubject<number>(null);
  infoSelected: number = null;

  constructor(private projectsService: ProjectsService) {
  }

  private infos: Info[] = [];

  getInfos() {
    return this.infos.slice();
  }

  getInfosLength() {
    return this.infos.length;
  }

  getInfo(index: number) {
    return this.infos[index];
  }

  removeInfo(index: number) {
    this.infos.splice(index, 1);
  }

  setInfos(infos: Info[]) {
    this.infos = infos;
  }

  startEditing(index: number) {
    this.startedEditing.next(index);
  }

  stopEditing() {
    this.startedEditing.next(null);
  }

  updateInfo(index: number, info: Info) {
    this.infos[index].summary = info.summary;
    this.infos[index].data = info.data;
    this.infos[index].observations = info.observations;
  }

  addInfo(info: Info) {
    this.infos.push(info);
  }

  infoSelection(index: number) {
    this.infoSelected = index;
  }

  createdInfoSelecting() {
    this.infoSelected = this.infos.length - 1;
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
