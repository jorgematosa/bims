export class Project {
  public name: string;
  public description: string;
  public roleAccess: string[];

   constructor(name: string, description: string, roleAccess: string[]) {
       this.name = name;
       this.description = description;
       this.roleAccess = roleAccess;
     }

}
