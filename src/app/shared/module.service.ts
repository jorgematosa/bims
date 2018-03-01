import { Module } from './module.model';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ModulesService {
  public modules: Module[] = [];
  modulesLoaded: Subject<boolean> = new BehaviorSubject<boolean>(false);

  moduleStatusUpdate(modules: Module[]) {
    this.modules = modules;
  }

  getModules() {
    return this.modules;
  }

  setModules(modules: Module[]) {
    this.modules = modules;
    this.modulesLoaded.next(true);
  }
}
