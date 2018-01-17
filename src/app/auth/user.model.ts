export class User {
  private username: string;
  private role: string;
  private email: string;
  private password: string;

  constructor(username: string, role: string, email: string, password: string) {
    this.username = username;
    this.role = role;
    this.email = email;
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

}
