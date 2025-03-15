import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { PersonFactOpitonsDTO, PersonMainInfoDTO, PersonOptionsDTO, PersonRelativeDTO, PersonRelativeOptionsDTO, FactShortInfoDTO } from './research.interface';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  url = "https://localhost:7161";
  public token = "";
  
  constructor(private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ1c2VyMiIsIm5iZiI6MTcxNzQ5NjY4MSwiZXhwIjoxNzE3NzEyNjgxLCJpYXQiOjE3MTc0OTY2ODEsImlzcyI6IjFkTEhkSWZTSzI3Skg2ZHNCRDNqaDhyZk0weSIsImF1ZCI6InNBeThzU2JGMmplMjBGRFMzcjRrQW03UXJhTmwwIn0.l6tO7ZyXWQiYXNFi7F-R8zKG-EwsbactrocNkuV9Rug';
  }

  public getPersons(options: PersonOptionsDTO): Observable<PersonMainInfoDTO[]> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<PersonMainInfoDTO[]>(`${this.url}/getPersons`, options, { headers });
  }
}