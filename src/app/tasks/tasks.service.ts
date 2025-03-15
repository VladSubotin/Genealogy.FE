import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TaskDTO, TaskOptionsDTO, TaskToCreateDTO, TaskToUpdateDTO, StepDTO, StepToAddDTO, StepToUpdateDTO } from './tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = "https://localhost:7161";
  public token = "";
  
  constructor(private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ1c2VyMiIsIm5iZiI6MTcxNzQ5NjY4MSwiZXhwIjoxNzE3NzEyNjgxLCJpYXQiOjE3MTc0OTY2ODEsImlzcyI6IjFkTEhkSWZTSzI3Skg2ZHNCRDNqaDhyZk0weSIsImF1ZCI6InNBeThzU2JGMmplMjBGRFMzcjRrQW03UXJhTmwwIn0.l6tO7ZyXWQiYXNFi7F-R8zKG-EwsbactrocNkuV9Rug';
  }

  public getTasks(options: TaskOptionsDTO): Observable<TaskDTO[]> {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<TaskDTO[]>(`${this.url}/getTasks`, options, { headers });
  }

  public addTask(newTask: TaskToCreateDTO) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(`${this.url}/addTask`, newTask, { headers });
  }

  public updateTask(task: TaskToUpdateDTO) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<string>(`${this.url}/updateTask`, task, { headers });
  }

  public removeTask(id: string) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.url}/removeTask?id=` + id , { headers });
  }

  public addStep(newStep: StepToAddDTO) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<string>(`${this.url}/addStep`, newStep, { headers });
  }

  public updateStep(step: StepToUpdateDTO) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<string>(`${this.url}/updateStep`, step, { headers });
  }

  public removeStep(id: string) {
    const token = this.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<string>(`${this.url}/removeStep?id=` + id , { headers });
  }
}