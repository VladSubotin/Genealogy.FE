import { Component, OnInit, Input } from '@angular/core';
import { FamilyService } from './family-profile.service';
import { FamilyProfileDTO, FamilyUsersDTO } from './family-profile.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-family-profile',
  templateUrl: './family-profile.component.html',
  styleUrl: './family-profile.component.css'
})
export class FamilyProfileComponent implements OnInit {

  familyId: string = "";
  familyProfile: FamilyProfileDTO = new FamilyProfileDTO();
  visiblePage: string = "Profile";

  editModalVisible = false;
  joinModalVisible = false;

  constructor(private familyService: FamilyService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.familyId = id;
    } 
    this.familyService.getFamily(this.familyId).subscribe(
      (data: FamilyProfileDTO) => {
        this.familyProfile = data;
        console.log('Family Profile:', this.familyProfile);
      },
      error => {
        console.error('Error fetching family profile:', error);
      }
    );
  }

  changePage(page : string) {
    this.visiblePage = page;
  }

  sendJoinRequest() {
    this.joinModalVisible = true;
  }
  
  editProfile() {
    this.editModalVisible = true;
  }
  cancelEdit() {
    this.editModalVisible = false;
    window.location.reload();
  }
  editFamily() {
    this.familyService.editFamily(this.familyProfile)
      .subscribe(  (response) => {
        console.log("Профіль оновлено:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Помилка оновлення профілю:", error);
      }
    );
  }

  deleteProfile() {
    if (confirm('Ви впевнені, що хочете видалити цей сімейний профіль ?')) {
      this.deleteFamily();
    }
  }
  deleteFamily() {
    this.familyService.deleteFamily(this.familyId)
      .subscribe(  (response) => {
        console.log("Профіль видалено:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Помилка видалення профілю:", error);
      }
    );
  }




  arrayBufferToBase64(arrayBuffer: ArrayBuffer | null): string {
    if (!arrayBuffer) return '';
    const byteArray = new Uint8Array(arrayBuffer);
    let binaryString = '';
    byteArray.forEach(byte => binaryString += String.fromCharCode(byte));
    return 'data:image/png;base64,' + btoa(binaryString);
  }  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFile(file).then((arrayBuffer: ArrayBuffer) => {
        this.familyProfile.profileIcon = arrayBuffer;
    });
    }
  }
  private readFile(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(arrayBuffer);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }



  photosMyFam: string[] = [
    'assets/images/fam2.jpg'
  ];
  photosNotMyFam: string[] = [
    'assets/images/fam1.jpg'
  ];
  currentIndex: number = 0;

  get currentPhotoMyFam(): string {
    return this.photosMyFam[this.currentIndex];
  }
  get currentPhotoNotMyFam(): string {
    return this.photosNotMyFam[this.currentIndex];
  }
}
