import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

import {
    HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  private localStorage: Storage;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // array in local storage for registered users
      const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

      // wrap in delayed observable to simulate server api call
      return of(null).pipe(mergeMap(() => {

          // authenticate
          if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
              // find if any user matches login credentials
              const filteredUsers = users.filter(user => {
                  return user.email === request.body.email && user.password === request.body.password;
              });

              if (filteredUsers.length) {
                  // if login details are valid return 200 OK with user details and fake jwt token
                  const user = filteredUsers[0];
                  const body = {
                      id: user.id,
                      email: user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      roles: user.roles,
                      token: 'fake-jwt-token'
                  };

                  return of(new HttpResponse({ status: 200, body: body }));
              } else {
                  // else return 400 bad request
                  return throwError({ error: { message: 'Username or password is incorrect' } });
              }
          }

          // get users
          if (request.url.endsWith('/users') && request.method === 'GET') {
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  return of(new HttpResponse({ status: 200, body: users }));
              } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorized' } });
              }
          }

          // get user by id
          if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // find user by id in users array
                  const urlParts = request.url.split('/');
                  const id = parseInt(urlParts[urlParts.length - 1], null);
                  const matchedUsers = users.filter(filteredUser =>  filteredUser.id === id );
                  const user = matchedUsers.length ? matchedUsers[0] : null;

                  return of(new HttpResponse({ status: 200, body: user }));
              } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorized' } });
              }
          }

          // register user
          if (request.url.endsWith('/users/register') && request.method === 'POST') {
              // get new user object from post body
              const newUser = request.body;

              // validation
              const duplicateUser = users.filter(user => user.email === newUser.email).length;
              if (duplicateUser) {
                  return throwError({ error: { message: 'Email "' + newUser.email + '" is already taken' } });
              }

              // save new user
              newUser.id = users.length + 1;
              users.push(newUser);

              localStorage.setItem('users', JSON.stringify(users));

              // respond 200 OK
              return of(new HttpResponse({ status: 200 }));
          }

          // delete user
          if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                  // find user by id in users array
                  const urlParts = request.url.split('/');
                  const id = parseInt(urlParts[urlParts.length - 1], null);
                  for (let i = 0; i < users.length; i++) {
                      const user = users[i];
                      if (user.id === id) {
                          // delete user
                          users.splice(i, 1);
                          localStorage.setItem('users', JSON.stringify(users));
                          break;
                      }
                  }

                  // respond 200 OK
                  return of(new HttpResponse({ status: 200 }));
              } else {
                  // return 401 not authorised if token is null or invalid
                  return throwError({ error: { message: 'Unauthorized' } });
              }
          }

          // pass through any requests not handled above
          return next.handle(request);

      }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
