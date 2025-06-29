import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/app.interface.user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private selectedUser: User | null = null;

  constructor(private http: HttpClient) { }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  getSelectedUser(): User | null {
    return this.selectedUser;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users.php');
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('/api/register.php', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('/api/register.php', user);
  }

  fetchUserById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users.php?id=${id}`);
  }

}
