import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Company, CompanyService } from 'src/app/services/company/company.service';
import { JobAppService } from 'src/app/services/jobApp/job-app.service';
import { User, UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  user: any;
  studentAppliedList: Company[] = [];


  constructor(  private router: Router,
    private http: HttpClient,
    private userCrudService: UserService,
    private companyService: CompanyService,
    private jobAppService: JobAppService,
    private zone: NgZone,
    private toast: ToastController,
    private storage: Storage) { }

  ngOnInit() {
    this.storage.create();
    this.userCrudService.getId().then((result) => {
       this.fetchUser(result);
      console.log('result', result);
      this.getAppliedList(result)
    });
  }

  
  getAppliedList(id) {    
    
    this.jobAppService.getStudentApplied(id).subscribe((result) => {
      console.log('applied result', result);
      for (var i = 0; i < result.length; i++) {
        this.companyService.getJob(result[i].job_id).subscribe((result) => {
          this.studentAppliedList.push(result);
        });
      }
    });
  }


  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);

    // this.getAppliedList();
  }

  
  fetchUser(id){
   this.userCrudService.getUser(id).subscribe(result =>
    this.user = result
   );


  }

}
