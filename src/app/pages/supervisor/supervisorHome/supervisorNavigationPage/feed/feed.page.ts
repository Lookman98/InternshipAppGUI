import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {
  CompanyService,
  Company,
} from 'src/app/services/company/company.service';
import { JobApp, JobAppService } from 'src/app/services/jobApp/job-app.service';
import { StudentService } from 'src/app/services/student/student.service';
import { User, UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  user: User;
  Students: User[] = [];
  isLogBook: boolean =  false;
  isMark: boolean =  false;
  logbooks: any;
  markValue: any;
  currLogbook: any;
  updateForm: FormGroup;


  constructor(
    private router: Router,
    private http: HttpClient,
    private companyService: CompanyService,
    private userCrudService: UserService,
    private studentService: StudentService,
    private jobAppService: JobAppService,
    public formBuilder: FormBuilder,
    private storage: Storage,
    private toast: ToastController
  ) {
    this.updateForm = this.formBuilder.group({
      mark: ['']
    })

  }

  ngOnInit() {
    this.storage.create();
    this.userCrudService.getId().then((result) => {
      this.fetchUser(result);
      console.log('result', result);
      this.getStudentList(result);
    });
  }

  ionViewDidEnter() {}

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

  }

  getStudentList(id){
    this.userCrudService.getStudentSupervisor(id).subscribe((data) => {
      for(var i = 0; i<data.length; i++){
        this.Students.push(data[i]);
      }
      // this.Students = data;
    });

  }

  logbook(isOpen: boolean){
    console.log("Trigger logbook");
   this.logbooks  = [
    {id: "1", name: "logbook1", mark:""},
    {id: "2", name: "logbook2", mark:""},
    {id: "3", name: "logbook3", mark:""},
  ];
  console.log("Trigger logbook", this.logbooks);
    this.isLogBook = isOpen;
  }

  mark(logbook: any, isOpen: boolean){
    console.log("Trigger mark");
    this.currLogbook = logbook;
    this.isMark = isOpen;
  }

  onSubmit(){

    if (!this.updateForm.valid) {
      return false;
    } else {
      console.log("curr",this.currLogbook);
      let updateMark = this.logbooks.find(x => x.id == this.currLogbook.id);
      console.log("curr",updateMark);
      let index = this.logbooks.indexOf(updateMark);
      console.log("curr",index);
      this.logbooks[index].mark = this.updateForm.controls.mark.value;

    
      console.log("updated",this.logbooks);
  

      this.updateForm.reset();
    }
    this.isMark = false
    this.getStudentList(this.user._id);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Job created success',
      duration: 2000
    });
    toast.present();
  }

  logbookClose(isOpen){
    this.isLogBook = isOpen;
  }
}
