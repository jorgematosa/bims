import { Project } from '../shared/project.model';

export class Info {
  public summary: string;
  public data: string;
  public observations: string;
  public project: Project;
  public section: string;

  constructor(
    summary: string, data: string, observations: string, project: Project, section: string
  ) {
    this.summary = summary;
    this.data = data;
    this.observations = observations;
    this.project = project;
    this.section = section;
  }

}
