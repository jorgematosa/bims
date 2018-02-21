import { User } from './../../../auth/user.model';
import { AuthService } from './../../../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from './../../../shared/projects.service';
import { Project } from './../../../shared/project.model';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnChanges {
  projects: Project[];
  // projectSelected: number;
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loggedUser = this.authService.loggedUser;
    this.projects = this.projectsService.getProjects();
  }

  ngOnChanges() {
    this.projects = this.projectsService.getProjects();
  }

  // onSelectTask(index: number) {
  //   this.tasksService.taskSelecting(index);
  //   this.router.navigate(['../task-detail'], {relativeTo: this.route});
  // }

  onEditProject(index: number) {
    this.projectsService.startEditing(index);
    this.router.navigate(['../project-edit'], {relativeTo: this.route});
  }

  hasAccess(roleAccess: string[]) { // verifica os tickets a que o utilizador tem acesso
    if (roleAccess.indexOf(this.loggedUser.role) > -1) {
      return true;
    } else {
      return false;
    }
  }

}
