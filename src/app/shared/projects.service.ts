import { Project } from './project.model';
import { Injectable } from '@angular/core';


@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    new Project('XPTO', 'First Project', ['Administration', 'Human Resources']),
    new Project('Care', 'Second Project', ['Administration', 'Development']),
    new Project('Ruth', 'Third Project', ['Administration', 'Marketing']),
    new Project('Last', 'Fourth Project', ['Administration', 'Quality Management'])
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
