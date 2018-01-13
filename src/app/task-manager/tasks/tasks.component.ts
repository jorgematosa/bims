import { Task } from './../task.model';
import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
  }

  onEditTask(id: number) {
    console.log(id);
  }

  newTask() {
    this.router.navigate(['../task-edit'], {relativeTo: this.route});
  }
}
