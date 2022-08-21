import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {



  logbooks = [
    {name: "logbook1"},
    {name: "logbook2"},
    {name: "logbook3"},
  ];

  file: File;
  user: User;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private userService: UserService,
    private toast: ToastController,
    private storage: Storage,
    private document: DocumentViewer,

  ) {}

  ngOnInit() {
    this.storage.create();
    this.userService.getId().then((result) => {
      this.fetchUser(result);
      console.log('result', result);
    });
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async submitForm() {
    
    this.user.resume = this.file.name;
    this.userService
      .updateUser(this.user._id, this.user)
      .subscribe((response) => {
        console.log('response', response);
      });

    let formData = new FormData();
    formData.append('photo', this.file);
    await this.userService.uploadFile(formData).subscribe((response) => {
      console.log(response);
    });

    this.fetchUser(this.user._id);

    this.presentToast();
  }

  openLocalPdf(){
    const options: DocumentViewerOptions ={
      title: 'My PDF'
    };

    this.document.viewDocument('.../.../.../assets/asset263502afe327d2455fceac1676950b9d.pdf','application/pdf', options);

  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'User created success',
      duration: 2000,
    });
    toast.present();
  }

  fetchUser(id) {
    this.userService.getUser(id).subscribe((result) => (this.user = result));
  }
}
