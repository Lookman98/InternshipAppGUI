import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {
  Company,
  CompanyService,
} from 'src/app/services/company/company.service';
import { JobApp, JobAppService } from 'src/app/services/jobApp/job-app.service';
import { User, UserService } from 'src/app/services/user/user.service';

//File
import { FileTransfer ,FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
// import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  user: User;
  JobList: Company[] = [];
  userId: string;
  isJobDetailModal = false;
  selectedJob: Company;
  message: string;
  // fileTransfer: FileTransferObject = this.transfer.create();
  file: File;


  // private file: File,
  // private fileOpener: FileOpener,
  // private filePath: FilePath
  constructor(
    private router: Router,
    private http: HttpClient,
    private userCrudService: UserService,
    private companyService: CompanyService,
    private jobAppService: JobAppService,
    private zone: NgZone,
    private toast: ToastController,
    private storage: Storage
   

  ) {}

  

  ngOnInit() {
    this.storage.create();
    this.userCrudService.getId().then((result) => {
      this.fetchUser(result);
      console.log('result', result);

    });

    this.getJobList();
    // this.getAppliedList();
  }

  ionViewDidEnter() {
    // console.log('result1', this.user._id);
    // this.getJobList()
    // this.getAppliedList()
  }



  fetchUser(id) {
    this.userCrudService.getUser(id).subscribe((data) => {
     this.user = data;
    });
  }

  getJobList() {
    this.companyService.getJobs().subscribe((data) => {
      for (var i = 0; i < data.length; i++) {
        this.JobList.push(data[i]);
      }
    });
  }

  jobDetail(id, isOpen: boolean) {
    this.companyService.getJob(id).subscribe((response) => {
      this.selectedJob = response;
    });

    this.isJobDetailModal = isOpen;
  }

  close(isOpen: boolean, modalName: string) {
    console.log('ModalName', modalName);
    if (modalName === 'isJobDetailModal') {
      this.isJobDetailModal = isOpen;
    }
    // else if(modalName === "manageApplicationModal"){
    //   this.manageApplicationModal = isOpen;
    // }
    // else if(modalName === "isEditModal"){
    //   this.isEditModal = isOpen;
    //   console.log("close", this.isEditModal)
    // }
  }

  apply(student: User) {


    const create = new JobApp();
    create.student_id = this.user._id as unknown as string;
    create.job_id = this.selectedJob._id as unknown as string;

    console.log('3', create);
    this.jobAppService.createJob(create).subscribe((response) => {
      this.zone.run(() => {
        this.presentToast(response);
        console.log(response);
      });
    });
  }

  //File


  // download() {
  //   const url = 'http://www.example.com/file.pdf';
  //   this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error
  //   });
  // }

 


  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);

    this.getJobList();
  }

  async presentToast(msg) {
    let input: string;
    if (msg != null) {
      input = msg;
    } else {
      input = 'Applied';
    }
    const toast = await this.toast.create({
      message: input,
      duration: 2000,
    });
    toast.present();
  }
}
