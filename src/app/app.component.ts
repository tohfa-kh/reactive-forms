import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames = ['Anna', 'Mark']

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.createValidation.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    this.signupForm.statusChanges.subscribe((status)=> {
      console.log(status);
  });
    this.signupForm.valueChanges.subscribe((value=> {
      console.log(value);
    }))

    this.signupForm.setValue({
      'userData' : {
        'username': 'Tohfa',
        'email': 'xalilovatofa@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    })
  }
  onSubmit() {
    console.log(this.signupForm);
  }

  createValidation (control:FormControl) : {[s:string]: boolean} {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameForbidden':true};
    } 
      return null;
  }

  forbiddenEmails (control:FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any> ((resolve, reject)=> {
      setTimeout(()=>{
        if (control.value === 'xalilTofa@mail.ru') {
          resolve({'emailIsForbidden':true})
        } else {
          resolve(null);
        }
      },1500)
    })
    return promise;
  }


// onShowHobbies() {
//   const control = new FormControl(null, Validators.required);
//     (<FormArray>this.signupForm.get('hobbies')).push(control);
// }
}
