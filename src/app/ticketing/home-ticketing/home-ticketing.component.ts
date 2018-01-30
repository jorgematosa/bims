import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-ticketing',
  templateUrl: './home-ticketing.component.html',
  styleUrls: ['./home-ticketing.component.css']
})
export class HomeTicketingComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSearchTickets() {
    this.router.navigate(['../tickets-explorer'], {relativeTo: this.route});
  }

  onCreateTicket() {
    this.router.navigate(['../ticket-edit'], {relativeTo: this.route});
  }
}
