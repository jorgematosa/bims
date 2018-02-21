export class Project {
  public name: string;
  public description: string;
  public roleAccess: string[];
  public infoSections: string[];
  public administrators: string[];

   constructor(name: string, description: string, roleAccess: string[], infoSections: string[], administrators: string[]) {
       this.name = name;
       this.description = description;
       this.roleAccess = roleAccess;
       this.infoSections = infoSections;
       this.administrators = administrators;
     }

}
