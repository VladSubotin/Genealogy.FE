import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FamilyDTO, FamilyToCreateDTO } from './families.interface';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  url = "https://localhost:7161";
  public token = "";
  
  constructor(private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ1c2VyMiIsIm5iZiI6MTcxNzQ5NjY4MSwiZXhwIjoxNzE3NzEyNjgxLCJpYXQiOjE3MTc0OTY2ODEsImlzcyI6IjFkTEhkSWZTSzI3Skg2ZHNCRDNqaDhyZk0weSIsImF1ZCI6InNBeThzU2JGMmplMjBGRFMzcjRrQW03UXJhTmwwIn0.l6tO7ZyXWQiYXNFi7F-R8zKG-EwsbactrocNkuV9Rug';
  }

  public getFamilies(name: string, login: boolean): Observable<FamilyDTO[]> {
    let token = "";
    if (login) {
        token = this.token;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<FamilyDTO[]>(`${this.url}/getFamilies?name=` + name, { headers });
  }

  public addFamily(newFamily: FamilyToCreateDTO): Observable<string> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(`${this.url}/addFamily`, newFamily, { headers });
  }
}