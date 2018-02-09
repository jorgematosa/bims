import { Project } from './project.model';
import { Injectable } from '@angular/core';


@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    new Project('XPTO', 'First Project', ['Administration', 'Human Resources'], ['Passwords', 'Programas', 'Máquinas']),
    new Project('Care', 'Second Project', ['Administration', 'Development'], ['Passwords', 'Programas']),
    new Project('Ruth', 'Third Project', ['Administration', 'Marketing'], ['Passwords', 'Máquinas']),
    new Project('Last', 'Fourth Project', ['Administration', 'Quality Management'], ['Passwords'])
  ];

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
}
