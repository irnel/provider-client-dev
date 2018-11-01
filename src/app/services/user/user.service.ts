import { KeyValues } from './../../helpers/key-values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models';

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
      `/users/${KeyValues.REGISTER_URI}`,
      new User(firstName, email, password, lastName));
  }

  update(user: User) {
    return this.http.put(`/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
