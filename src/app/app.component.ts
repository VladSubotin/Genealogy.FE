import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-profile/user-profile.service';
import { TokenDTO, LoginDTO } from './user-profile/user-profile.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public token?;
  loginData: LoginDTO = new LoginDTO();
  exVisible = false;

  constructor(private userService: UserService, private http: HttpClient) {  
    this.token = localStorage.getItem('auth-token');
  }

  login() {
    this.userService.login(this.loginData).subscribe(
        (data: TokenDTO) => {
          localStorage.setItem('auth-token', data.token);
          this.token = data.token;
        },
        error => {
          this.exVisible = true;
        }
      );
  }
  logout() {
    localStorage.removeItem('auth-token');
    window.location.reload();
  }
}
