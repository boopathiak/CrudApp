import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// import { HeaderService } from './header.service';
@Injectable()
export class AuthService {
    apiUrl = environment.apiUrldb;
  users: any;
    constructor(private http: HttpClient, private router: Router) { }
    userDetails: string;
    /**
   * Method which is used to signin the application for given login details
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   */
    addUser(fname: string, lname: string, email: string, password: string) {
        const data = {
          firstname: fname,
          lastname: lname,
          email: email,
          password: password
        };
        // const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.apiUrl + 'v1/adduser', data);
    }
    getUsers() {
        return this.http.get(this.apiUrl + 'v1/getusers');
    }
    getUser(id: number) {
        const data = { id: id };
        console.log('GetUser : ' + id);
        return this.http.post(this.apiUrl + 'v1/getuser', data);
    }
    updateUser(userId: number, firstname: string, lastname: string, email: string, password: string) {
        const data = {
            userId: userId,
            user: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
            },
        };
        return this.http.post(this.apiUrl + 'v1/updateuser', data);
    }
    deleteUser(id: number) {
        const data = {id: id};
        console.log('Service : ' + id);
        return this.http.post(this.apiUrl + 'v1/deleteuser', data);
    }

    login(email: string, password: string) {
        const data = { email: email, password: password };
        console.log('Service : ' + data);
        return this.http.post(this.apiUrl + 'v1/login', data);
    }
}

