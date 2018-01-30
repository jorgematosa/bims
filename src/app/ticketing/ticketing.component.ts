import { TasksService } from './../task-manager/tasks.service';
import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../auth/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data.storage.service';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.css']
})
export class TicketingComponent implements OnInit, OnDestroy {
  projects = null;
  projectSelectedIndex = -1;
  projectSelected = null;
  startedEditing = null;
  subscription: Subscription;
  loggedUser: User = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() {
    setTimeout(
      () => {
        this.loggedUser = this.authService.getLoggedUser();
        this.projects = this.tasksService.getProjectsByRole(this.loggedUser.role);
        // this.projectSelectedIndex = this.tasksService.projectSelected;
        // this.tasksService.selectProject(this.projectSelectedIndex);
      //   this.subscription = this.tasksService.startedEditingEvent.subscribe(
      //     (index: number) => {
      //       this.startedEditing = index;
      //     }
      //   );
      //   this.dataStorageService.getTasks();
       }, 1600
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isLoaded() {
    if (this.loggedUser !== null && this.projects !== null ) {
      return true;
    } else {
      return false;
    }
  }

  // selectProject(project: Project, index: number) {
  //   this.projectSelected = project.name;
  //   this.projectSelectedIndex = index;
  //   this.tasksService.selectProject(index);

  //   // checking the route
  //   if (this.router.url === '/task-manager') {
  //     this.router.navigate(['tasks'], {relativeTo: this.route});
  //   }
  // }


}
