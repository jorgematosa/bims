import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration-console',
  templateUrl: './administration-console.component.html',
  styleUrls: ['./administration-console.component.css']
})
export class AdministrationConsoleComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onRegister() {
    this.router.navigate(['register'], {relativeTo: this.route});
  }
}
