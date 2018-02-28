import { HttpEvent } from '@angular/common/http';
import { DataStorageService } from './../../../shared/data.storage.service';
import { Module } from './../../../shared/module.model';
import { ModulesService } from './../../../shared/module.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
  modules: Module[] = [];

  constructor(private modulesService: ModulesService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.modules = this.modulesService.modules;
  }

  onStatusChange(index: number) {
    if (this.modules[index].status === 'Active') {
      this.modules[index].status = 'Inactive';
    } else {
      this.modules[index].status = 'Active';
    }

    this.modulesService.moduleStatusUpdate(this.modules);
    // store tasks in backend
    this.dataStorageService.storeModules()
    .subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
  }

}
