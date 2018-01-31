import { Project } from './../shared/project.model';
export class Task {
  public id: number;
  public name: string;
  public details: string;
  public priority: string;
  public reporter: string;
  public assignee: string;
  public state: string;
  public project: Project;

   constructor(
     id: number, name: string, details: string, priority: string, reporter: string, assignee: string, state: string, project: Project) {
       this.id = id;
       this.name = name;
       this.details = details;
       this.priority = priority;
       this.reporter = reporter;
       this.assignee = assignee;
       this.state = state;
       this.project = project;
     }

}
