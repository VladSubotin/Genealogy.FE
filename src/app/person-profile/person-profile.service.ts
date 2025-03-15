import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { PersonProfileDTO, PersonNameDTO, PersonFactDTO, FactToCreateDTO, VersionToCreateDTO, NameToCreateDTO } from './person-profile.interface';

@Injectable({
    providedIn: 'root'
  })
  export class PersonService {
    url = "https://localhost:7161";
    public token = "";
    
    constructor(private http: HttpClient) {  
      this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ1c2VyMiIsIm5iZiI6MTcxNzQ5NjY4MSwiZXhwIjoxNzE3NzEyNjgxLCJpYXQiOjE3MTc0OTY2ODEsImlzcyI6IjFkTEhkSWZTSzI3Skg2ZHNCRDNqaDhyZk0weSIsImF1ZCI6InNBeThzU2JGMmplMjBGRFMzcjRrQW03UXJhTmwwIn0.l6tO7ZyXWQiYXNFi7F-R8zKG-EwsbactrocNkuV9Rug';
    }
  
    public getPerson(id: string): Observable<PersonProfileDTO> {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<PersonProfileDTO>(`${this.url}/getPerson?id=` + id, { headers });
    }

    public updatePerson(person: PersonProfileDTO) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put(`${this.url}/updatePerson`, person, { headers });
    }

    public AddName(person: NameToCreateDTO) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      return this.http.post(`${this.url}/addPersonName`, person, { headers });
    }

    public DeleteName(id: string) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/removePersonName?id=` + id, { headers });
    }

    public AddFact(person: FactToCreateDTO) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.url}/addPersonFact`, person, { headers });
    }

    public DeleteFact(id: string) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/removePersonFact?id=` + id, { headers });
    }

    public AddVersion(person: VersionToCreateDTO) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.url}/addPersonFactVersion`, person, { headers });
    }

    public DeleteVersion(id: string) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/removePersonFactVersion?id=` + id, { headers });
    }

    public DeletePerson(id: string) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/removePerson?id=` + id, { headers });
    }

    public DeleteRelation(id: string) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/removePersonRelation?id=` + id, { headers });
    }
  }