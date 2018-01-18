import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration-console',
  templateUrl: './administration-console.component.html',
  styleUrls: ['./administration-console.component.css']
})
export class AdministrationConsoleComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
  }

  onRegister() {
    this.authService.updatingUser = false;
    this.authService.updatingUserSub.next(false);
    this.router.navigate(['register'], {relativeTo: this.route});
  }
  onUpdate() {
    this.authService.updatingUser = true;
    this.authService.updatingUserSub.next(true);
    this.router.navigate(['register'], {relativeTo: this.route});
  }
}
