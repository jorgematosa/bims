import { TicketingService } from './../../ticketing/ticketing.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private ticketingService: TicketingService) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

  onHome() {
    this.ticketingService.home.next(true);
  }
}
