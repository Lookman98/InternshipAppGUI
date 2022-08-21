import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  userForm: FormGroup;
  message: string;


  constructor( 
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private userCrudService: UserService,
    private toast: ToastController,
    
    ) {

    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      username: [''],
      password: [''],
      role: ['']
    })
    
   }

  ngOnInit() {
  }

  
 onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      console.log("onSubmit");
      console.log(this.userForm.value);
      this.userCrudService.createUser(this.userForm.value)
        .subscribe((response) => {
          this.zone.run(() => {
            this.userForm.reset();
            this.presentToast();
           
          })
        });
    }
  }

  
  async presentToast() {
    const toast = await this.toast.create({
      message: 'User created success',
      duration: 2000
    });
    toast.present();
  }

}
