import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StudentService } from 'src/app/services/student/student.service';
import { User, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  user: User;
  Students: User[];
  Supervisors: User[];
  Companies: User[];
  id: any;
  userInfo: User;
  unAssignstudentLists: User[];
  assignedStudentLists: User[];
  isUserDetailModal = false;
  isUserListModal = false;
  isLogBook: boolean = false;
  supervisorName: string = "Supervisor1"
  logbooks = [
      {id: "1", name: "logbook1", mark:"90"},
      {id: "2", name: "logbook2", mark:"80"},
      {id: "3", name: "logbook3", mark:""},
  ];
  

  constructor(
    private route: Router,
    private userCrudService: UserService,
    private studentService: StudentService,
    private storage: Storage
  ) {}

  ngOnInit() {
    
    this.userCrudService.getId().then((result) => {
      this.fetchUser(result);
      console.log('result', result);
    });
  }

  ionViewDidEnter() {
    this.userCrudService.getUsers().subscribe((response) => {
      // this.User = response.filter((x: User) => x.email === 'Student');;
      this.Students = response.filter((x: User) => x.role === 'Student');
      this.Companies = response.filter((x: User) => x.role === 'Company');
      this.Supervisors = response.filter((x: User) => x.role === 'Supervisor');
    });
  }

  doRefresh(event) {
    this.userCrudService.getUsers().subscribe((response) => {
      // this.User = response.filter((x: User) => x.email === 'Student');;
      this.Students = response.filter((x: User) => x.role === 'Student');
      this.Companies = response.filter((x: User) => x.role === 'Company');
      this.Supervisors = response.filter((x: User) => x.role === 'Supervisor');
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  doRefresh2(event) {
    this.studentService
      .getStudentAssign(this.userInfo._id)
      .subscribe((data) => {
        this.assignedStudentLists = data;
        console.log('Assigned', this.assignedStudentLists);
      });

    this.studentService.getStudentUnAssign().subscribe((data) => {
      this.unAssignstudentLists = data;
      console.log('UnAssigned', this.unAssignstudentLists);
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  //   segmentChanged2(ev : any){
  //     if(ev == "Lecturer"){
  //       return this.lecturers;
  //     }
  // }

  removeUser(user, i) {
    if (window.confirm('Are you sure')) {
      console.log(user.role);
      // this.userCrudService.deleteUser(student._id)
      //     .subscribe(() => {
      //         this.Students.splice(i, 1);
      //         console.log('User deleted!')
      //       }
      //     )

      if (user.role == 'Student') {
        this.userCrudService.deleteUser(user._id).subscribe(() => {
          this.Students.splice(i, 1);
          console.log('User deleted!', user._id);
        });
      } else if (user.role == 'Supervisor') {
        this.userCrudService.deleteUser(user._id).subscribe(() => {
          this.Supervisors.splice(i, 1);
          console.log('User deleted!');
        });
      } else if (user.role == 'Company') {
        this.userCrudService.deleteUser(user._id).subscribe(() => {
          this.Companies.splice(i, 1);
          console.log('User deleted!');
        });
      }
    }
  }

  userDetail(id: any, isOpen: boolean) {
    this.fetchUserDetail(id);
    this.isUserDetailModal = isOpen;
  }

  assignStudent(isOpen) {
    this.studentService
      .getStudentAssign(this.userInfo._id)
      .subscribe((data) => {
        this.assignedStudentLists = data;
        console.log('Assigned', this.assignedStudentLists);
      });

    this.studentService.getStudentUnAssign().subscribe((data) => {
      this.unAssignstudentLists = data;
      console.log('UnAssigned', this.unAssignstudentLists);
    });

    this.isUserListModal = isOpen;
  }

  confirmAssign(student: User, i) {
    student.supervisor_id = this.userInfo._id;
    this.userCrudService.updateUser(student._id, student).subscribe((data) => {
      this.user = data;
      this.unAssignstudentLists.splice(i, 1);
    });
  }

  addUser() {
    this.route.navigate(['/adduser']);
  }

  fetchUser(id) {
    this.userCrudService.getUser(id).subscribe((data) => {
      this.user = data;
    });
  }

  fetchUserDetail(id) {
    this.userCrudService.getUser(id).subscribe((data) => {
      this.userInfo = data;
    });
  }

  userListModalClose(isOpen: boolean) {
    this.isUserListModal = isOpen;
  }

  userDetailModalClose(isOpen: boolean) {
    this.isUserDetailModal = isOpen;
  }

  logbookClose(isOpen: boolean){
    this.isLogBook = isOpen;
  }

  viewLogBook(isOpen: boolean){
    this.isLogBook = isOpen;
  }
}
