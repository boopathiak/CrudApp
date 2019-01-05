import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('f')  registerform: NgForm;
  submitted = false;
  message: string;
  constructor(private authService: AuthService) { }

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  onSubmit() {
    this.submitted = true;
    this.user.firstname = this.registerform.value.firstname;
    this.user.lastname = this.registerform.value.lastname;
    this.user.email = this.registerform.value.email;
    this.user.password = this.registerform.value.password;

    this.authService.addUser(this.user.firstname, this.user.lastname, this.user.email, this.user.password).subscribe((res) => {
      if (res) {
        const result = res['userDetails'];
        this.message = 'Inserted Successfuly';
        console.log(result);
      } else {
        this.message = 'Not Inserted';
      }
    });
  }
}
