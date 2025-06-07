import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private host = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users.php');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/register.php', user);
  }
}
