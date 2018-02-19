import { InfoManagerService } from './../info-manager.service';
import { Info } from './../info.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.css']
})
export class InfoDetailComponent implements OnInit {
  info: Info;
  infoSelected: number = null;

  constructor(
    private infoManagerService: InfoManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.infoSelected = this.infoManagerService.infoSelected;
    console.log('number: ' + this.infoSelected);
    this.info = this.infoManagerService.getInfo(this.infoSelected);
  }

  onEditInfo() {
    this.infoManagerService.startEditing(this.infoSelected);
    console.log('info selected: ' + this.infoSelected);
    this.router.navigate(['../info-edit'], {relativeTo: this.route});
  }

  onGoBack() {
    this.router.navigate(['../info'], {relativeTo: this.route});
  }
}
