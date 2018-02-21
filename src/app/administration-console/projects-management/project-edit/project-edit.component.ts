import { UserRolesService } from './../../../shared/user-roles.service';
import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../../shared/data.storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from './../../../shared/projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../../shared/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  projectSelectedSubscription: Subscription;
  projectEditForm: FormGroup;
  projects: Project[];
  project: Project;
  projectSelected: Project;
  editedProjectIndex: number = null;
  userRoles: string[] = [];
  rolesToAdd: string[] = [];
  selectedValue: string[] = [];

  constructor(
    private projectsService: ProjectsService,
    private userRolesService: UserRolesService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.projects = this.projectsService.getProjects();
    this.userRoles = this.userRolesService.roles;
    this.subscription = this.projectsService.startedEditing.subscribe(
      (index: number) => {
        this.editedProjectIndex = index;
      }
    );
    this.projectSelectedSubscription = this.projectsService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.initForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.projectSelectedSubscription.unsubscribe();
  }

  onSubmit() {
    const projectForm = this.projectEditForm.value;
    const newProject = new Project(
      projectForm.name,
      projectForm.description,
      projectForm.roleAccess,
      projectForm.infoSections,
      projectForm.administrators
    );
    if (this.editedProjectIndex !== null) {
      this.projectsService.updateProject(this.editedProjectIndex, newProject);
    } else {
      this.projectsService.addProject(newProject);
      // select created task
      // this.projectsService.createdProjectSelecting();
    }
    this.editedProjectIndex = null;
    this.projectsService.stopEditing();
    // store tasks in backend
    // this.dataStorageService.storeInfos()
    // .subscribe(
    //   (response: HttpEvent<Object>) => {
    //     console.log(response);
    //   }
    // );
    // navigate away
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.editedProjectIndex = null;
    this.projectsService.stopEditing();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    if (this.editedProjectIndex !== null) {
      this.project = this.projectsService.getProject(this.editedProjectIndex);
      this.selectedValue = this.project.roleAccess;
      this.projectEditForm = new FormGroup({
        'name': new FormControl(this.project.name, Validators.required),
        'description': new FormControl(this.project.description, Validators.required),
        'roleAccess': new FormControl(true, Validators.required),
        'infoSections': new FormControl(this.project.infoSections),
        'administrators': new FormControl(this.project.administrators)
      });
    } else {
      this.projectEditForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'roleAccess': new FormControl(null, Validators.required),
        'infoSections': new FormControl(this.project.infoSections),
        'administrators': new FormControl(this.project.administrators)
      });
    }
  }

}
