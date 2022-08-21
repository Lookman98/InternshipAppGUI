import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user/user.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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
    return this.httpClient.post<User>('http://localhost:5000/api/student/create', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Error occured'))
      );
  }

  getStudent(id): Observable<User> {
    return this.httpClient.get<User>('http://localhost:5000/api/student/fetch/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User>(`Get user id=${id}`))
      );
  }

  getStudents(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api/student/GetStudents')
      .pipe(
        tap(users => console.log('Student retrieved!')),
        catchError(this.handleError<User[]>('Get student', []))
      );
  }

  getStudentAssign(id): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api/student/GetStudentsAssigned/' + id)
      .pipe(
        tap(users => console.log('Student Assigned retrieved!')),
        catchError(this.handleError<User[]>('Get student', []))
      );
  }

  getStudentUnAssign(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:5000/api/student/GetStudentsUnAssign')
      .pipe(
        tap(users => console.log('Student UnAssign retrieved!')),
        catchError(this.handleError<User[]>('Get student', []))
      );
  }

  updateUser(id, user: User): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/update/' + id, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update user'))
      );
  }

  deleteUser(id): Observable<User[]> {
    return this.httpClient.delete<User[]>('http://localhost:5000/api/delete/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete user'))
      );
  }

  // login(user: User): Observable<User> {
  //   return this.httpClient.get<User>('http://localhost:5000/api/login', user, this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError<User>(`Error occured`))
  //     );
  // }

  


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
  

}
