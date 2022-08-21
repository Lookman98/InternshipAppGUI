import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.page.html',
  styleUrls: ['./upload-cv.page.scss'],
})
export class UploadCVPage implements OnInit {
  CVForm = new FormGroup({
    name: new FormControl(),
    degree: new FormControl(),
    skills: new FormControl(),
    note: new FormControl()
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get name(): any {
    return this.CVForm.get('name');
    }
    get description(): any {
    return this.CVForm.get('degree');
    }
    get requirement(): any {
    return this.CVForm.get('skills');
    }
    get company_name(): any {
    return this.CVForm.get('note');
    }
    
    save(): void {
    console.log(this.CVForm.value); 
    }
    cancel(){
      console.log('cancelled form'),
      this.router.navigate(['/student-dash/feed'])
    }

}
