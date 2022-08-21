import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logs: string[] = [];

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {

    if (e === 'student'){
      this.router.navigate(['/student-dash/feed'])

    } else if (e === 'company'){
      this.router.navigate(['/company-dash/feed'])
    }

   else if (e === 'admin'){
    this.router.navigate(['/admin-dash/feed'])
    }

  else if (e === 'supervisor'){
  this.router.navigate(['/supervisor-dash/feed'])
   }
  }

}
