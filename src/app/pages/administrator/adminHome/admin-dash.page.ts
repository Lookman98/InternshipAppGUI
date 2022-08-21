import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.page.html',
  styleUrls: ['./admin-dash.page.scss'],
})
export class AdminDashPage implements OnInit {
  id: any;
  constructor(private router: Router,private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
