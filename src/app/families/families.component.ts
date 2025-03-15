import { FamilyDTO, FamilyToCreateDTO } from './families.interface';
import { FamilyService } from './families.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrl: './families.component.css'
})
export class FamiliesComponent {
  familyName: string = "";
  families: FamilyDTO[] = [];
  showMyFamilies: boolean = false;

  newFamily: FamilyToCreateDTO = new FamilyToCreateDTO();
  addModalVisible = false;

  constructor(private familyService: FamilyService, private router: Router) { }

  ngOnInit(): void {
    this.serch();
  }

  serch() {
    this.familyService.getFamilies(this.familyName, this.showMyFamilies).subscribe(
      (data: FamilyDTO[]) => {
        this.families = data;
        console.log('Families:', this.families);
      },
      error => {
        console.error('Error fetching families:', error);
      }
    );
  }

  seeFamily(id: string) {
    this.router.navigate(['/family-profile', id]);
  }

  addFamily() {
    this.familyService.addFamily(this.newFamily).subscribe(
      (data: string) => {
        this.seeFamily(data);
        console.log('Family is added:', data);
      },
      error => {
        console.error('Error adding family:', error);
      }
    );
  }
  addFamilyStart() {
    this.addModalVisible = true;
  }
  cancelAdding() {
    this.newFamily = new FamilyToCreateDTO();
    this.addModalVisible = false;
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
        this.newFamily.profileIcon = arrayBuffer;
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
}
