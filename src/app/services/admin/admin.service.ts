import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage }  from '@ionic/storage';

const BASEURL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private storage: Storage) {}

  getUserData(id): Observable<any> {
    return this.http.get(`${BASEURL}/user/${id}`);
  }

  async getUserId() {
    return await this.storage.get('useremail');
  }

 
  assignStudent(user, lecturer): Observable<any> {
    return this.http.post(`${BASEURL}/register/user`, {
      user: user,
      lecturer: lecturer
    });
  }

  // uploadImage(user, image): Observable<any> {
  //   return this.http.post(`${BASEURL}/v1/profile/upload`, {
  //     user: user,
  //     image: image
  //   });
  // }

  // uploadLogo(id, image): Observable<any> {
  //   return this.http.post(`${BASEURL}/v1/user/upload`, {
  //     company: id,
  //     image: image
  //   });
  // }

  // searchUser(user): Observable<any> {
  //   return this.http.post(`${BASEURL}/search-user`, {
  //     user: user
  //   });
  // }

  // leaderBoard(): Observable<any> {
  //   return this.http.get(`${BASEURL}/companies/leaderboard`);
  // }
}
