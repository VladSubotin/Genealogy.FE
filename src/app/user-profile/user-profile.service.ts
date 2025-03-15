import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserFamiliesDTO, UserFullProfileDTO, UserPublicProfileDTO, TokenDTO, LoginDTO, User } from './user-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "https://localhost:7161";
  public token = "";
  
  constructor(private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJyb21hbjg0IiwibmJmIjoxNzE3ODMzMDMwLCJleHAiOjE3MTgwNDkwMzAsImlhdCI6MTcxNzgzMzAzMCwiaXNzIjoiMWRMSGRJZlNLMjdKSDZkc0JEM2poOHJmTTB5IiwiYXVkIjoic0F5OHNTYkYyamUyMEZEUzNyNGtBbTdRcmFObDAifQ.mUtmke5vHYeBWwQIcODLRW8UuYu97fYh0-ay1-egLrg';
  }

  public getSelf(): Observable<UserFullProfileDTO> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserFullProfileDTO>(`${this.url}/getSelf`, { headers });
  }

  public getUser(login: string): Observable<UserPublicProfileDTO> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserPublicProfileDTO>(`${this.url}/getUser?login=` + login, { headers });
  }

  public login(login: LoginDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.url}/login`, login);
  }

  public update(user: User) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/updateUser`, user, { headers });
  }
}