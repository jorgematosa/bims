import { Project } from './../shared/project.model';
export class Ticket {
  public id: number;
  public summary: string;
  public description: string;
  public ticketReporter: Project;
  public destProject: Project;
  public priority: string;
  public state: string;

  constructor (
    id: number, summary: string, description: string, ticketReporter: Project, destProject: Project, priority: string, state: string
  ) {
    this.id = id;
    this.summary = summary;
    this.description = description;
    this.ticketReporter = ticketReporter;
    this.destProject = destProject;
    this.priority = priority;
    this.state = state;
  }

}
