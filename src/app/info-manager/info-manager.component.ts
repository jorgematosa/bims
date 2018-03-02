import { DataStorageService } from './../shared/data.storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { InfoManagerService } from './info-manager.service';
import { Subscription } from 'rxjs';
import { Project } from '../shared/project.model';
import { ProjectsService } from '../shared/projects.service';
import { User } from './../auth/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-manager',
  templateUrl: './info-manager.component.html',
  styleUrls: ['./info-manager.component.css']
})
export class InfoManagerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userLoadedSubscription: Subscription;
  currentSectionSubscription: Subscription;
  currentSection: string = null;
  projectSelected: Project;
  userProjects: Project[] = null;
  loggedUser: User = null;

  constructor(
    private authService: AuthService,
    private projectsService: ProjectsService,
    private infoManagerService: InfoManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.subscription = this.infoManagerService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.userLoadedSubscription = this.authService.usersLoaded.subscribe(
      (flag: boolean) => {
        if (flag === true) {
          this.loggedUser = this.authService.loggedUser;
          // this.userProjects = this.projectsService.getProjectsByRole(this.loggedUser.role);
          this.userProjects = this.projectsService.getProjects();
          this.dataStorageService.getInfos();
        }
      }
    );
    this.currentSectionSubscription = this.infoManagerService.currentSection.subscribe(
      (section: string) => {
        this.currentSection = section;
        if (section !== null) {
          this.router.navigate(['info'], {relativeTo: this.route});
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userLoadedSubscription.unsubscribe();
    this.currentSectionSubscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null && this.userProjects !== null ) {
      return true;
    } else {
      return false;
    }
  }

  selectProject(project: Project) {
    this.infoManagerService.projectSelected.next(project);
    this.infoManagerService.currentSection.next(null);
    this.router.navigate(['info-manager']);
  }

  onInfo(infoSection: string) {
    this.infoManagerService.currentSection.next(infoSection);
    this.router.navigate(['info'], {relativeTo: this.route});
  }

}
