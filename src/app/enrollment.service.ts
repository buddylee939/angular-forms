import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  API_URL = 'http://localhost:3000/enroll';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  enroll(user: User) {
    console.log('This is in service ' + user);
    return this.http.post<any>(this.API_URL, user, this.httpOptions);
  }
}
