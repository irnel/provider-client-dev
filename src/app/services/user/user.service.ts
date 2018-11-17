import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models';
import { Roles } from './../../helpers/enum-roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  getById(id: number) {
    return this.http.get(`/users/${id}`);
  }

  createAccount(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(
      `/users/register`,
      new User(firstName, lastName, email, password, [Roles.Provider]));
  }

  update(user: User) {
    return this.http.put(`/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
