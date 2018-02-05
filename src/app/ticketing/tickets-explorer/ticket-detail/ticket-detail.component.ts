import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketingService } from './../../ticketing.service';
import { Ticket } from './../../ticket.model';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: Ticket;
  ticketSelected: number;

  constructor(private ticketingService: TicketingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ticketSelected = this.ticketingService.ticketSelected;
    this.ticket = this.ticketingService.getTicket(this.ticketSelected);
  }


  onEditTask() {
    this.ticketingService.startEditing(this.ticketSelected);
    this.router.navigate(['../../ticket-edit'], {relativeTo: this.route});
  }

  onGoBack() {
    this.router.navigate(['../tickets-list'], {relativeTo: this.route});
  }
}
