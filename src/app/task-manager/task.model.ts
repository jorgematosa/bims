export class Task {
  public id: number;
  public name: string;
  public details: string;
  public reporter: string;
  public assignee: string;
  public state: string;

   constructor(
     id: number, name: string, details: string, reporter: string, assignee: string, state: string) {
       this.id = id;
       this.name = name;
       this.details = details;
       this.reporter = reporter;
       this.assignee = assignee;
       this.state = state;
     }

}
