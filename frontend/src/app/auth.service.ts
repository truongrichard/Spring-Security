import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {

    //console.log("Credentials : " + credentials);
    return this.http.post('auth/signin/', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

}
