import { first } from 'rxjs/operators';
import { UserService } from './../../services/user/user.service';
import { User } from './../../models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(
        users => this.users = users
      );
  }

}
