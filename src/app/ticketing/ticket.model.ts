import { Project } from './../shared/project.model';
export class Ticket {
  public id: number;
  public summary: string;
  public description: string;
  public destProject: Project;

  constructor (id: number, summary: string, description: string, destProject: Project) {
    this.id = id;
    this.summary = summary;
    this.description = description;
    this.destProject = destProject;
  }

}
