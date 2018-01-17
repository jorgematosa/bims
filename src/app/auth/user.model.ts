export class User {
  public username: string;
  public role: string;
  public email: string;
  public password: string;

  constructor(username: string, role: string, email: string, password: string) {
    this.username = username;
    this.role = role;
    this.email = email;
    this.password = password;
  }


}
