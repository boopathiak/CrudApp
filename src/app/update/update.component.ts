import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild('f')  registerform: NgForm;
  result;
  submitted = false;
  message: string;
  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };
  userId: number;
  constructor(private authservice: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.userId = params['id'];
        console.log(this.userId);
      }
    });

    this.authservice.getUser(this.userId).subscribe((res) => {
        console.log(res['userlist']);
    });
  }

  onUpdate(){
    this.submitted = true;
    this.user.firstname = this.registerform.value.firstname;
    this.user.lastname = this.registerform.value.lastname;
    this.user.email = this.registerform.value.email;
    this.user.password = this.registerform.value.password;
    this.authservice.updateUser(this.userId, this.user.firstname, this.user.lastname, this.user.email, this.user.password).subscribe((res) => {
      if(res){
        this.message = "Updated Successfuly";
      } else {
        this.message = "Not Updated";
      }
    });
  }
}
