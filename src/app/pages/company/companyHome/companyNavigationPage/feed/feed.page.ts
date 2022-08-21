import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CompanyService, Company } from 'src/app/services/company/company.service';
import { JobApp, JobAppService } from 'src/app/services/jobApp/job-app.service';
import { StudentService } from 'src/app/services/student/student.service';
import { User, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  jobs: Company[];
  job: Company;
  user: User;
  jobApp: JobApp[];
  acceptedJob: JobApp[];
  studentLists: User[] = [];
  acceptedLists: User[] = [];
  isJobDetailModal = false;
  isEditModal = false;
  manageApplicationModal = false;
  editForm: FormGroup;

  constructor(private router: Router,
    private http: HttpClient, 
    private companyService: CompanyService, 
    private userCrudService: UserService,
    private studentService: StudentService,
    private jobAppService: JobAppService,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private toast: ToastController
    ) { 

    this.editForm = this.formBuilder.group({
      title: [''],
      description: [''],
    })

  }

  

  ngOnInit() {
    this.storage.create();
    this.userCrudService.getId().then((result) => {
      this.fetchUser(result);
      console.log('result', result);
    });
    
  }

ionViewDidEnter() {
  this.getJobList(this.user._id) 
}

fetchUser(id) {
  this.userCrudService.getUser(id).subscribe((data) => {
    this.user = data;
  });
}

doRefresh(event) {

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 1000);

  this.getJobList(this.user._id);

}

getJobList(id) {
  console.log("getData",id);
  this.companyService.getCompanyJobs(id).subscribe((response) => {
    this.jobs = response;
  });
 
}

jobDetail(id, isOpen: boolean){
  this.companyService.getJob(id).subscribe((response) => {
    this.job = response;
  });

  this.isJobDetailModal = isOpen;
}


remove(value, i, isOpen: boolean) {
  if (window.confirm('Are you sure')) {
    console.log(value.role);
    this.companyService.deleteJob(value._id).subscribe(() => {
      this.jobs.splice(i, 1);
      console.log('Job deleted!', value._id);
      this.isJobDetailModal = isOpen;
    });
  }
}

editJob(isOpen: boolean){

  console.log("Edit");
  
  this.companyService.getJob(this.job._id).subscribe((data) => {
    console.log("Edit", data);
    this.editForm.setValue({
      title: data['title'],
      description: data['description'],
    });
  });

  this.isEditModal = isOpen;
}

close(isOpen:boolean, modalName: string){
  console.log("ModalName", modalName);
  if(modalName === "isJobDetailModal"){
    this.isJobDetailModal = isOpen;
  }else if(modalName === "manageApplicationModal"){
    this.manageApplicationModal = isOpen;
  }
  else if(modalName === "isEditModal"){
    this.isEditModal = isOpen;
    console.log("close", this.isEditModal)
  }
}

manageApplication(isOpen: boolean){
  console.log("application");
  this.manageApplicationModal = isOpen;

  

   this.jobAppService.getJobApplication(this.job._id).subscribe((data1) => {
      this.jobApp = data1;
      

      for(var i = 0; i<this.jobApp.length; i++){
        this.studentService.getStudent(this.jobApp[i].student_id).subscribe((data2) => {
          this.studentLists.push(data2);
          console.log("Application", this.studentLists);
        });
      }
  });

  this.jobAppService.accepted(this.job._id).subscribe((data) => {
    this.acceptedJob = data;

    for(var i = 0; i<this.acceptedJob.length; i++){
      this.studentService.getStudent(this.acceptedJob[i].student_id).subscribe((data2) => {
        this.acceptedLists.push(data2);
        console.log("Application2", this.acceptedLists);
      });
    }
  });

  
}


accept(student: User,i){
  var currApplicant = this.jobApp.find(element => element.student_id === student._id.toString());
  this.jobAppService.accept(currApplicant._id, currApplicant).subscribe(() => {
    this.jobApp.splice(i,1);
  });
}

download(){

}

onSubmit(){
  if (!this.editForm.valid) {
    return false;
  } else {
    this.companyService.updateJob(this.job._id, this.editForm.value)
      .subscribe(() => {
        this.editForm.reset();
        this.isEditModal = false;
        this.isJobDetailModal = false;
      })
  }
  this.presentToast();
}

async presentToast() {
  const toast = await this.toast.create({
    message: 'Job Updated',
    duration: 2000
  });
  toast.present();
}


}
