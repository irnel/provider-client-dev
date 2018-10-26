import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorage: Storage;

  constructor(private readonly http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(
      `/users/authenticate`, { username: username, password: password })
      .pipe(map(user => {

        if (user && user.token) {
          this.localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    this.localStorage.removeItem('currentUser');
  }
}
