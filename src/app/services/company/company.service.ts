import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { JobApp, JobAppService } from '../jobApp/job-app.service';
import { User } from '../user/user.service';
import { StudentService } from '../student/student.service';
import { AngularDelegate } from '@ionic/angular';

export class Company {
  _id: number;
  title: string;
  description: string;
  status: string;
  company_id: number
}

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  jobApp : any[];
  student: any[];
  applicationList: User[];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, 
    private storage: Storage, 
    private jobAppService: JobAppService,
    private studentService: StudentService
    ) { }

  async getId() {
    return await this.storage.get('id');
  }

  async getJobDetail() {
    return await this.storage.get('JobDetail');
  }


  createJob(job: Company): Observable<any> {
    return this.httpClient.post<Company>('http://localhost:5000/api/company/create-job', job, this.httpOptions)
      .pipe(
        catchError(this.handleError<Company>('Error occured'))
      );
  }

  getJob(id): Observable<Company> {
    return this.httpClient.get<Company>('http://localhost:5000/api/company/fetch-job/' + id)
      .pipe(
        tap(_ => console.log(`Company fetched: ${id}`)),
        catchError(this.handleError<Company>(`Get Company id=${id}`))
      );
  }

  getJobs(): Observable<Company[]> {
    return this.httpClient.get<Company[]>('http://localhost:5000/api/company/GetCompany')
      .pipe(
        tap(Jobs => console.log('Jobs retrieved!')),
        catchError(this.handleError<Company[]>('Get Company', []))
      );
  }


  getCompanyJobs(id): Observable<Company[]> {
    return this.httpClient.get<Company[]>('http://localhost:5000/api/company/GetCompanyJob/' + id )
      .pipe(
        tap(Jobs => console.log('Jobs retrieved!')),
        catchError(this.handleError<Company[]>('Get Company', []))
      );
  }

  updateJob(id, job: Company): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/company/update-job/' + id, job, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Company updated: ${id}`)),
        catchError(this.handleError<Company[]>('Update Company'))
      );
  }

  deleteJob(id): Observable<Company[]> {
    return this.httpClient.delete<Company[]>('http://localhost:5000/api/company/delete-job/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Company deleted: ${id}`)),
        catchError(this.handleError<Company[]>('Delete Company'))
      );
  }

  // getJobApplication(id) {

  //   this.jobAppService.getJobApplication(id).subscribe((data) => {
  //     this.jobApp = data;
  //   });

  //   this.studentService.getStudent().subscribe((data) => {
  //     this.student = data;
  //   });

  // //   this.jobApp.forEach(function (value1, value2) {
  // //     console.log("Value1 ", value1);
  // //     console.log("Value2 ", value2);
  // //  });

  //   this.applicationList = this.student.filter(element => this.jobApp.includes(element));
    
  //   console.log("compare",this.applicationList);

  //  return null;
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
  

}
