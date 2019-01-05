import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  users = [];
  userId: number;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.getUsers().subscribe((res) =>{
      this.users = res['usersList'];
      console.log(this.users);
    });
  }

  onDelete(id: number){
      this.userId = id;
      console.log("Component : " + this.userId);
      this.authService.deleteUser(this.userId).subscribe((res) => {
        const result = res['deleteuser'];
        console.log(result);
      });
  }
  onEdit(id: number){
    this.userId = id;
    this.router.navigate(['/app/update', this.userId]);
}

}
