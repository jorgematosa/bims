import { Injectable } from '@angular/core';

@Injectable()
export class UserRolesService {
  public roles = ['Administration', 'Default', 'Human Resources', 'Development', 'Marketing', 'Quality Management'];
}
