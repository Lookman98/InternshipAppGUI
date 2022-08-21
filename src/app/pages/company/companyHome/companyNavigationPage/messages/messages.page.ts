import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CompanyService } from 'src/app/services/company/company.service';
import { User, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  jobForm: FormGroup;
  message: string;
  user: User;


  constructor(    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private companyService: CompanyService,
    private toast: ToastController,
    private userCrudService: UserService,
    ) { 

    this.jobForm = this.formBuilder.group({
      title: [''],
      description: [''],
      company_id: ['']
    })
    

  }

  ngOnInit() {

    this.userCrudService.getId().then((result) => {
      this.fetchUser(result);
      console.log('result', result);
    });

  }

  onSubmit() {
    if (!this.jobForm.valid) {
      return false;
    } else {
      // console.log("onSubmit");
      this.jobForm.controls['company_id'].setValue(this.user._id);
      
      console.log(this.jobForm.value);
      this.companyService.createJob(this.jobForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.jobForm.reset();
            this.presentToast();
           
          })
        });
    }
  }

  
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Job created success',
      duration: 2000
    });
    toast.present();
  }

  fetchUser(id) {
    this.userCrudService.getUser(id).subscribe((data) => {
      this.user = data;
    });
  }

}
