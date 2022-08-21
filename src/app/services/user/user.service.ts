import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

export class User{
  _id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  jobfield: string;
  status:  string;
  resume:  string;
  password: string;
  supervisor_id: number;


  //job
  jobApp_id: number;
  job_id: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  async getId() {
    return await this.storage.get('id');
  }

  async getUserDetail() {
    return await this.storage.get('userDetail');
  }


  createUser(user: User): Observable<any> {
    return this.httpClient.post<User>('http://localhost:5000/api/create-user', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Error occured'))
      );
  }

  getUser(id): Observable<User> {
    return this.httpClient.get<User>('http://localhost:5000/api/fetch-user/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User>(`Get user id=${id}`))
      );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api')
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<User[]>('Get user', []))
      );
  }

  updateUser(id, user: User): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/update-user/' + id, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update user'))
      );
  }

  deleteUser(id): Observable<User[]> {
    return this.httpClient.delete<User[]>('http://localhost:5000/api/delete-user/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete user'))
      );
  }


  uploadFile(formData: FormData) {
    return this.httpClient.post<FormData>("http://localhost:5000/upload", formData)
      .pipe(
        catchError(this.handleError<FormData>('Error occured'))
      );
  }

  getStudentSupervisor(id): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api/GetStudentSupervisor/' + id)
      .pipe(
        tap(users => console.log('Users retrieved!')),
        catchError(this.handleError<User[]>('Get user', []))
      );
  }

  
  login(user: User): Observable<any> {
    return this.httpClient.post<User>('http://localhost:5000/api/login', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Error occured'))
      );
  }

  


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
  

}
