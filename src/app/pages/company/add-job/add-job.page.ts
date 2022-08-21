import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.page.html',
  styleUrls: ['./add-job.page.scss'],
})
export class AddJobPage implements OnInit {
    jobForm = new FormGroup({
      job_name: new FormControl(),
      description: new FormControl(),
      requirement: new FormControl(),
      company_name: new FormControl()
  });
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

    get job_name(): any {
    return this.jobForm.get('job_name');
    }
    get description(): any {
    return this.jobForm.get('description');
    }
    get requirement(): any {
    return this.jobForm.get('requirement');
    }
    get company_name(): any {
    return this.jobForm.get('company_name');
    }
    
    save(): void {
    console.log(this.jobForm.value); 
    }
    cancel(){
      console.log('cancelled form'),
      this.router.navigate(['/company-dash/feed'])
    }
   
}