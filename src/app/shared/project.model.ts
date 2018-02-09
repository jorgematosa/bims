export class Project {
  public name: string;
  public description: string;
  public roleAccess: string[];
  public infoSections: string[];

   constructor(name: string, description: string, roleAccess: string[], infoSections: string[]) {
       this.name = name;
       this.description = description;
       this.roleAccess = roleAccess;
       this.infoSections = infoSections;
     }

}
