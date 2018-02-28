import { Info } from './../info.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoManagerService } from '../info-manager.service';
import { Project } from '../../shared/project.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {
  infos: Info[] = [];
  projectSelected: Project;
  currentSection: string;
  projectSubscription: Subscription;
  currentInfoSubscription: Subscription;

  constructor(
    private infoManagerService: InfoManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.infos = this.infoManagerService.getInfos();
    this.projectSubscription = this.infoManagerService.projectSelected.subscribe(
      (project: Project) => {
        this.projectSelected = project;
      }
    );
    this.currentInfoSubscription = this.infoManagerService.currentSection.subscribe(
      (currentSection: string) => {
        this.currentSection = currentSection;
      }
    );
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.currentInfoSubscription.unsubscribe();
  }

  newEntry() {
    this.router.navigate(['../info-edit'], {relativeTo: this.route});
  }

  onSelectInfo(index: number) {
    this.infoManagerService.infoSelection(index);
    this.router.navigate(['../info-detail'], {relativeTo: this.route});
  }

  onEditInfo(index: number) {
    this.infoManagerService.startEditing(index);
    this.router.navigate(['../info-edit'], {relativeTo: this.route});
  }

  showInfo(info: Info) {
    if (info === null) {
      return null;
    } else if (info.project.name === this.projectSelected.name && info.section === this.currentSection) {
      return true;
    } else {
      return false;
    }
  }


}
