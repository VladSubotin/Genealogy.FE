import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FamilyUsersDTO, FamilyProfileDTO, FamilyToUpdateDTO } from './family-profile.interface';

@Injectable({
    providedIn: 'root'
  })
  export class FamilyService {
    url = "https://localhost:7161";
    public token = "";
    
    constructor(private http: HttpClient) {  
      this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ1c2VyMiIsIm5iZiI6MTcxNzQ5NjY4MSwiZXhwIjoxNzE3NzEyNjgxLCJpYXQiOjE3MTc0OTY2ODEsImlzcyI6IjFkTEhkSWZTSzI3Skg2ZHNCRDNqaDhyZk0weSIsImF1ZCI6InNBeThzU2JGMmplMjBGRFMzcjRrQW03UXJhTmwwIn0.l6tO7ZyXWQiYXNFi7F-R8zKG-EwsbactrocNkuV9Rug';
    }
  
    public getFamily(id: string): Observable<FamilyProfileDTO> {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<FamilyProfileDTO>(`${this.url}/getFamily?id=` + id, { headers });
    }

    public editFamily(family: FamilyProfileDTO): Observable<FamilyToUpdateDTO> {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const profileIconBytes = family.profileIcon ? this.arrayBufferToByteArray(family.profileIcon) : null;

      const editUser = {
        id: family.id,
        name: family.name, 
        description: family.description,
        privacyLevel: family.privacyLevel,
        profileIcon: null
      }
      return this.http.put<FamilyToUpdateDTO>(`${this.url}/updateFamily`, editUser, { headers });
    }

    public deleteFamily(id: string) {
      const token = this.token;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.delete(`${this.url}/removeFamily?id=` + id, { headers });
    }

    public arrayBufferToByteArray(arrayBuffer: ArrayBuffer): number[] {
      const uint8Array = new Uint8Array(arrayBuffer);
      return Array.from(uint8Array);
    }



  }