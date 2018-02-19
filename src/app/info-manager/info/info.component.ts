import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoManagerService } from '../info-manager.service';
import { Info } from '../info.model';
import { Project } from '../../shared/project.model';
import { Subscription } from 'rxjs';

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

  constructor(private infoManagerService: InfoManagerService) { }

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

  }

}
