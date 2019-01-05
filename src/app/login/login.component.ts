import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f')  loginform: NgForm;
  submitted = false;
  error: boolean;
  errorMsg: string;
  logindetails = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.logindetails.email = this.loginform.value.email;
    this.logindetails.password = this.loginform.value.password;
    console.log(this.logindetails);

    this.authService.login(this.logindetails.email, this.logindetails.password).subscribe((res) => {
      if(res){
        this.router.navigate(['app/home']);
      }
  }, (err) => {
    if(err.error && err.error.error){
      this.errorMsg = err.error.error;
      this.error = true;
    }
  });
  }
}
