import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

export class JobApp {
  _id: number;
  student_id: string;
  job_id: string;
  status?: string;

  student_name?: string;
}


@Injectable({
  providedIn: 'root'
})
export class JobAppService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  async getId() {
    return await this.storage.get('id');
  }

  async getJobDetail() {
    return await this.storage.get('JobDetail');
  }


  createJob(job: JobApp): Observable<any> {
    return this.httpClient.post<JobApp>('http://localhost:5000/api/jobApp/create', job, this.httpOptions)
      .pipe(
        catchError(this.handleError<JobApp>('Error occured'))
      );
  }

  getJob(id): Observable<JobApp> {
    return this.httpClient.get<JobApp>('http://localhost:5000/api/jobApp/fetch/' + id)
      .pipe(
        tap(_ => console.log(`JobApp fetched: ${id}`)),
        catchError(this.handleError<JobApp>(`Get JobApp id=${id}`))
      );
  }


  getJobApplication(id): Observable<JobApp[]> {
    return this.httpClient.get<JobApp[]>('http://localhost:5000/api/jobApp/GetJobApplication/' + id )
      .pipe(
        tap(Jobs => console.log('Jobs retrieved!')),
        catchError(this.handleError<JobApp[]>('Get JobApp', []))
      );
  }


  getStudentApplied(id): Observable<JobApp[]> {
    return this.httpClient.get<JobApp[]>('http://localhost:5000/api/jobApp/GetStudentApplied/' + id )
      .pipe(
        tap(Jobs => console.log('Jobs retrieved!')),
        catchError(this.handleError<JobApp[]>('Get JobApp', []))
      );
  }

  updateJob(id, job: JobApp): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/jobApp/update/' + id, job, this.httpOptions)
      .pipe(
        tap(_ => console.log(`JobApp updated: ${id}`)),
        catchError(this.handleError<JobApp[]>('Update JobApp'))
      );
  }

  accept(id, job: JobApp): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/jobApp/accept/' + id, job, this.httpOptions)
      .pipe(
        tap(_ => console.log(`JobApp updated: ${id}`)),
        catchError(this.handleError<JobApp[]>('Update JobApp'))
      );
  }



  deleteJob(id): Observable<JobApp[]> {
    return this.httpClient.delete<JobApp[]>('http://localhost:5000/api/jobApp/delete/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`JobApp deleted: ${id}`)),
        catchError(this.handleError<JobApp[]>('Delete JobApp'))
      );
  }

 
  accepted(id): Observable<JobApp[]> {
    return this.httpClient.get<JobApp[]>('http://localhost:5000/api/jobApp/accepted/' + id )
      .pipe(
        tap(Jobs => console.log('Jobs retrieved!')),
        catchError(this.handleError<JobApp[]>('Get JobApp', []))
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
