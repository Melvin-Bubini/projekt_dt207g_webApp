import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:3001/api/auth/login";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {username, password};
    return this.http.post<any>(this.url, body);
  }
}
