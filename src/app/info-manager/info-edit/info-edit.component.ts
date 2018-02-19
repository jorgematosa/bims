import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../shared/data.storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from './../../shared/projects.service';
import { InfoManagerService } from './../info-manager.service';
import { Project } from './../../shared/project.model';
import { Info } from './../info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.css']
})
export class InfoEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  projectSelectedSubscription: Subscription;
  sectionSubscription: Subscription;
  infoEditForm: FormGroup;
  editedInfoIndex = null;
  info: Info;
  projects: Project[];
  projectSelected: Project;
  currentSection: string;

  constructor(
    private infoManagerService: InfoManagerService,
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.subscription = this.infoManagerService.startedEditing.subscribe(
      (index: number) => {
        this.editedInfoIndex = index;
      }
    );
    this.projects = this.projectsService.getProjects();
    this.projectSelectedSubscription = this.infoManagerService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.sectionSubscription = this.infoManagerService.currentSection.subscribe(
      (section: string) => {
        this.currentSection = section;
      }
    );
    this.initForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.projectSelectedSubscription.unsubscribe();
    this.sectionSubscription.unsubscribe();
  }

  onSubmit() {
    const infoForm = this.infoEditForm.value;
    const newInfo = new Info(
      infoForm.summary,
      infoForm.data,
      infoForm.observations,
      this.projectSelected,
      this.currentSection
    );
    if (this.editedInfoIndex !== null) {
      this.infoManagerService.updateInfo(this.editedInfoIndex, newInfo);
    } else {
      console.log(newInfo);
      this.infoManagerService.addInfo(newInfo);
      console.log(this.infoManagerService.getInfos());
      // select created task
      this.infoManagerService.createdInfoSelecting();
    }
    this.editedInfoIndex = null;
    this.infoManagerService.stopEditing();
    // store tasks in backend
    this.dataStorageService.storeInfos()
    .subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
        // navigate away
    this.router.navigate(['../info-detail'], {relativeTo: this.route});
  }

  onCancel() {
    this.editedInfoIndex = null;
    this.infoManagerService.stopEditing();
    this.router.navigate(['../info'], {relativeTo: this.route});
  }

  private initForm() {
    if (this.editedInfoIndex !== null) {
      this.info = this.infoManagerService.getInfo(this.editedInfoIndex);
      console.log(this.info);
      this.infoEditForm = new FormGroup({
        'summary': new FormControl(this.info.summary, Validators.required),
        'data': new FormControl(this.info.data),
        'observations': new FormControl(this.info.observations)
      });
    } else {
      this.infoEditForm = new FormGroup({
        'summary': new FormControl(null, Validators.required),
        'data': new FormControl(null),
        'observations': new FormControl(null)
      });
    }

  }

}
