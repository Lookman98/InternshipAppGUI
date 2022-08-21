import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User, UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  id: string;
  email: string;
  password: string;
  user: User;
  userId: string;
  // user: User;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private userCrudService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  async login() {
    await this.showLoading();

    if (!this.loginForm.valid) {
      console.log('onLogin');
      return false;
    } else {
      console.log('onLogin');
      console.log(this.loginForm.value);
      this.userCrudService.login(this.loginForm.value).subscribe((response) => {
        this.zone.run(
          () => {
            this.loginForm.reset();
            this.id = response._id as unknown as string;
            this.storage.create();
            this.storage.set('id', this.id);
       
            if (response.role == 'Student') {
              this.router.navigate(['/student-dash/']);
            } else if (response.role == 'Company') {
              this.router.navigate(['/company-dash/feed']);
            } else if (response.role == 'Supervisor') {
              this.router.navigate(['/supervisor-dash/feed']);
            } else {
              this.router.navigate(['/admin-dash/']);
              // this.router.navigate(['/admin-dash/', this.id]);
            }
          },
          (err) => {
            this.loadingCtrl.dismiss();
            this.showAlert('Login Error', err.error.error);
          }
        );
      });
    }
  }

  // registerPage() {
  //   this.router.navigate(['/register']);
  // }

  // async login() {
  //   await this.showLoading();
  //   if (this.loginForm.value === undefined) {
  //     this.loadingCtrl.dismiss();
  //     this.showAlert('Login Error', 'You cannot submit empty fields');
  //     return;
  //   }

  //   this.userCrudService.login(this.loginForm.value).subscribe(
  //     (res) => {
  //       this.loadingCtrl.dismiss();
  //       if (res) {
  //         this.storage.set('id', res._id);
  //         // this.router.navigate(['/home']);

  //         if (res.role == 'Student') {
  //           this.router.navigate(['/student-dash/feed']);
  //         } else if (res.role == 'Company') {
  //           this.router.navigate(['/company-dash/feed']);
  //         } else if (res.role == 'Supervisor') {
  //           this.router.navigate(['/supervisor-dash/feed']);
  //         } else {
  //           this.router.navigate(['/admin-dash/feed']);
  //           // this.router.navigate(['/admin-dash/', this.id]);
  //         }
  //       }
  //     },
  //     (err) => {
  //       this.loadingCtrl.dismiss();
  //       this.showAlert('Login Error', err.error.error);
  //     }
  //   );
  // }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating...',
      spinner: 'crescent',
      duration: 2000,
    });

    return await loading.present();
  }

  async showAlert(header, subHeader) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      buttons: ['OK'],
    });

    return await alert.present();
  }
}
