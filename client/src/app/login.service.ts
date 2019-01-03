import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getAuth(): Observable<User> {
    return this.http.get<User>('http://localhost:8081/getUser') != null ? 
      this.http.get<User>('http://localhost:8081/getUser') : null;
  }
}

export class User{

  userId: number;
  username:string;
  password:string;
  role:string;

}

