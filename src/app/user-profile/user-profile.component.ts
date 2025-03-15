import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFamiliesDTO, UserFullProfileDTO, UserPublicProfileDTO, TokenDTO, LoginDTO, User } from './user-profile.interface';
import { UserService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  login: string = "";
  myProfile: UserFullProfileDTO = new UserFullProfileDTO();
  userProfile: UserPublicProfileDTO = new UserPublicProfileDTO();
  myPage: boolean = true;
  mail = "te1es2t4t@gmail.com";

  editModalVisible = false;
  editUser: User = new User();
  exVisible = false;

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit(): void {
      this.get();
    }

    startUpdate() {
      this.exVisible = false;
      this.editUser.birthDate = this.myProfile.birthDate;
      this.editUser.description = this.myProfile.description;
      this.editUser.email = this.myProfile.email;
      this.editUser.login = this.myProfile.login;
      this.editUser.name = this.myProfile.name;
      this.editUser.profileIcon = this.myProfile.profileIcon;
      this.editModalVisible = true;
    }
    cancelUpdate() {
      this.editModalVisible = false;
      this.editUser = new User();
      this.exVisible = false;
    }
    update() {
      this.userService.update(this.editUser).subscribe(
        (response) => {
          this.exVisible = false;
          this.editModalVisible = false;
          this.editUser = new User();
          this.get();
          console.log('User Updated:', this.myProfile);
        },
        error => {
          console.error('Error updating user profile:', error);
          this.exVisible = true;
        }
      );
    }

    get() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.myPage = false;
        this.login = id;
        this.userService.getUser(this.login).subscribe(
          (data: UserPublicProfileDTO) => {
            this.userProfile = data;
            console.log('User Profile:', this.userProfile);
          },
          error => {
            console.error('Error fetching user profile:', error);
          }
        );
      } 
      else {
        this.myPage = true;
        this.userService.getSelf().subscribe(
          (data: UserFullProfileDTO) => {
            this.myProfile = data;
            console.log('Self Profile:', this.myProfile);
          },
          error => {
            console.error('Error fetching self profile:', error);
          }
        );
      }
    }


    photosRoman: string[] = [
      'assets/images/roman.jpg'
    ];
    photosOther: string[] = [
      'assets/images/other.jpg'
    ];
    currentIndex: number = 0;
  
    get currentPhotoRoman(): string {
      return this.photosRoman[this.currentIndex];
    }
    get currentPhotoOther(): string {
      return this.photosOther[this.currentIndex];
    }
}
