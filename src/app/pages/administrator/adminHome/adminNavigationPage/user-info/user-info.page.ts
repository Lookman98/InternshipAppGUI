import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  updateUserFg: FormGroup;
  id: any;
  user : User;
  
  
  constructor(
    private userCrudService: UserService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
   
  }
  
  ngOnInit() {
  
    this.userCrudService.getUserDetail().then(result => {
      this.fetchUser(result);
      console.log("result", result);
    });
  
    this.updateUserFg = this.formBuilder.group({
      name: [''],
      email: [''],
      username: ['']
    })
  }
  
  fetchUser(id) {
    this.userCrudService.getUser(id).subscribe((data) => {
      // this.updateUserFg.setValue({
      //   name: data['name'],
      //   email: data['email'],
      //   username: data['username']
      // });
      this.user = data;
      console.log(this.user);
    });
  
  
  }
  
  onSubmit() {
    if (!this.updateUserFg.valid) {
      return false;
    } else {
      this.userCrudService.updateUser(this.id, this.updateUserFg.value)
        .subscribe(() => {
          this.updateUserFg.reset();
          this.router.navigate(['/userlist']);
        })
    }
  }
  
  
  }
  