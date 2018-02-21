import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs';
import { Project } from './project.model';
import { Injectable } from '@angular/core';


@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  startedEditing: Subject<number> = new BehaviorSubject<number>(null);
  projectSelected: Subject<Project> = new BehaviorSubject<Project>(null);

  getProjects() {
    return this.projects.slice();
  }

  getProjectsByRole(role: string) {
    const projects = this.projects.slice();
    const remIndex: number[] = [];

    // gets the index of the items to be removed
    for (const item of projects) {
      if (!item.roleAccess.includes(role)) {
        remIndex.push(projects.indexOf(item));
      }
    }

    // removes the items
    for (let i = remIndex.length - 1; i >= 0; i--) {
      projects.splice(remIndex[i], 1);
    }

    return projects;
  }

  getProjectByName(name: string) {
    const projects = this.projects.slice();
    for (const project of projects) {
      if (project.name === name) {
        return project;
      }
    }
  }

  getProjectsLength() {
    return this.projects.length;
  }

  getProject(index: number) {
    return this.projects[index];
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  startEditing(index: number) {
    this.startedEditing.next(index);
  }

  stopEditing() {
    this.startedEditing.next(null);
  }

  updateProject(index: number, project: Project) {
    this.projects[index] = project;
  }

  addProject(project: Project) {
    this.projects.push(project);
  }

  // projectSelection(index: number) {
  //   this.projectSelected = index;
  // }

  // createdProjectSelecting() {
  //   this.projectSelected = this.projects.length - 1;
  // }

  roleExists(role: string) {
    for (const project of this.projects) {
      for (const roles of project.roleAccess) {
        if (roles === role) {
          return true;
        }
      }
    }
    return false;
  }
}
