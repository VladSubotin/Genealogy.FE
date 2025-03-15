import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from './person-profile.service';
import { PersonProfileDTO, PersonFactDTO, PersonFactVersionDTO, PersonImageDTO, PersonNameDTO, PersonRelativeDTO, ConflictVerDTO, FactToCreateDTO, VersionToCreateDTO, NameToCreateDTO } from './person-profile.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '@angular/common';

const factTypeTranslations = {
  "Birth": "Народження",
  "Deth": "Смерть",
  "Marriage": "Одруження",
  "MilitaryService": "Військова служба",
  "Education": "Навчання",
  "Work": "Робота",
  "Other": "Інше"
};

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrl: './person-profile.component.css'
})
export class PersonProfileComponent {
  personId: string = "";
  personProfile: PersonProfileDTO = new PersonProfileDTO();
  image: ArrayBuffer = new ArrayBuffer(0);

  editableProfile: PersonProfileDTO = this.personProfile;
  isEditing: boolean = false;
  newName: PersonNameDTO = new PersonNameDTO();
  newFactType: string = "";
  availableFactTypes: string[] = Object.values(factTypeTranslations); // Массив украинских значений фактов
  factTypeMap: { [key: string]: string } = factTypeTranslations; // Карта английских значений фактов на украинские
  isAddingNewVersion: boolean = false;
  newVersion: PersonFactVersionDTO = new PersonFactVersionDTO();
  isVarning: boolean = false;


  deleteModalVisible = false;

  constructor(private personService: PersonService, private route: ActivatedRoute,
    private router: Router, private location: Location) { }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.personId = id;
      } 
      this.get();
    }

    get() {
      this.personService.getPerson(this.personId).subscribe(
        (data: PersonProfileDTO) => {
          this.personProfile = data;
          console.log('Family Profile:', this.personProfile);
          this.editableProfile = this.personProfile
        },
        error => {
          console.error('Error fetching family profile:', error);
        }
      );
    }

    editProfile() {
      this.isEditing = true;
      this.editableProfile = { ...this.personProfile };
      if (this.personProfile.names) {
        this.editableProfile.names = this.personProfile.names.map(name => ({ ...name }));
      }
      console.log(this.personProfile);
    }
  
    cancelEdit() {
      this.editableProfile = { ...this.personProfile };
      this.isEditing = false;
      // Здесь нужно вызвать сервис для сохранения обновленных данных
    }

    getGenderLabel(gender: string): string {
      return gender === 'Male' ? 'Чоловіча' : 'Жіноча';
    }

    addName() {
      if (this.newName.name && this.newName.nameType) {
        if (this.editableProfile.names) {
          this.newName.id = uuidv4();
          this.editableProfile.names.push({ ...this.newName });
        }
        const cName = new NameToCreateDTO();
        cName.id = this.newName.id;
        cName.isMain = this.newName.isMain;
        cName.name = this.newName.name;
        cName.nameType = this.newName.nameType;
        cName.personId = this.personId;
        this.personService.AddName(cName)
        .subscribe(  (response) => {
          console.log("Ім'я додано:", response);
        },
        (error) => {
          console.error("Помилка видалення імені:", error);
        }
      );
        // Очистка полей после добавления имени
        this.newName = new PersonNameDTO();
      } else {
        alert('Пожалуйста, заполните все поля');
      }
    }
    confirmDeleteName(index: number) {
      if (confirm('Точно видалити імя ?')) {
        if (this.editableProfile.names) {
          const nId = this.editableProfile.names[index]
          this.personService.DeleteName(nId?.id)
          .subscribe(  (response) => {
            console.log("Ім'я видалено:", response);
          },
          (error) => {
            console.error("Помилка видалення імені:", error);
          }
        );
          this.editableProfile.names.splice(index, 1);
        }
      }
    }

    deleteFact(factIndex: number) {
      // Здесь вы можете добавить код для удаления факта
      // Например, вызов модального окна для подтверждения удаления
      if (confirm('Ви впевнені, що хочете видалити цей факт?')) {
        if (this.editableProfile.facts) {
          const fId = this.editableProfile.facts[factIndex]
          this.personService.DeleteFact(fId?.id)
          .subscribe(  (response) => {
            console.log("Факт видалено:", response);
          },
          (error) => {
            console.error("Помилка видалення факту:", error);
          }
        );
          this.editableProfile.facts.splice(factIndex, 1);
        }
      }
    }

    addNewFact() {
      // Проверка наличия фактов "народження" и "смерть"
      if ((this.newFactType === "Deth" || this.newFactType === "Birth") && this.checkExistingFact(this.factTypeMap[this.newFactType])) {
        alert('Факт "' + this.factTypeMap[this.newFactType] + '" вже існує у персоны!');
        return;
      }

      // Создание нового факта с уникальным id и английским типом
      const newFact = {
        id: uuidv4(),
        factType: this.getEnglishFactType(this.newFactType), // Сохраняем английское значение
        versions: []
      };
      const cFact = new FactToCreateDTO();
      cFact.id = newFact.id;
      cFact.factType = newFact.factType;
      cFact.personId = this.personId;
      this.personService.AddFact(cFact)
      .subscribe(  (response) => {
        console.log("Факт додано:", response);
      },
      (error) => {
        console.error("Помилка додання факту:", error);
      }
    );

      if (this.editableProfile.facts) {
        this.editableProfile.facts.push(newFact);
      }
  
      // Очистка выбранного типа нового факта
      this.newFactType = "";
    }
  
    getEnglishFactType(ukrainianFactType: string): string {
      return Object.keys(this.factTypeMap).find(key => this.factTypeMap[key] === ukrainianFactType) || "";
    }

    // Метод для проверки существующих фактов типа "народження" или "Смерть"
    checkExistingFact(factType: string): boolean {
      const englishFactType = this.getEnglishFactType(factType);
      if (this.editableProfile.facts) {
        return this.editableProfile.facts.some(fact => fact.factType === englishFactType);
      }
      else {
        return false;
      }
    }
  
  // Переключение режима добавления новой версии
  toggleAddingVersion(): void {
    this.isAddingNewVersion = !this.isAddingNewVersion;
  }

  // Отмена добавления новой версии
  cancelAddingVersion(): void {
    this.isAddingNewVersion = false;
    // Сброс значений новой версии
    this.newVersion = new PersonFactVersionDTO();
  }


  dateRangeValidator(dateFrom: string | undefined, dateTo: string | undefined) {
    return dateFrom && dateTo && dateFrom > dateTo ? { dateRange: true } : null;
  }
  // Добавление новой версии факта
  addVersion(factIndex: number): void {
    // Проверяем наличие данных в новой версии перед добавлением
    if (this.editableProfile.facts && !this.dateRangeValidator(this.newVersion.dateFrom, this.newVersion.dateTo)) {
      // Добавляем новую версию в массив
      // Перед этим, если versions не существует, создаем пустой массив
      if (!this.editableProfile.facts[factIndex].versions) {
        this.editableProfile.facts[factIndex].versions = [];
      }
      if (this.editableProfile.facts[factIndex].versions) {
        this.newVersion.id = uuidv4();
        this.editableProfile.facts[factIndex].versions?.push(this.newVersion);
      }
      const cVer = new VersionToCreateDTO();
      cVer.id = this.newVersion.id;
      cVer.biographicalFactId = this.editableProfile.facts[factIndex].id;
      cVer.dateFrom = this.newVersion.dateFrom;
      cVer.dateTo = this.newVersion.dateTo;
      cVer.location = this.newVersion.location;
      cVer.note = this.newVersion.note;
      cVer.place = this.newVersion.place;
      cVer.role = this.newVersion.role;
      cVer.source = this.newVersion.source;
      cVer.veracity = this.newVersion.veracity;
      this.personService.AddVersion(cVer)
      .subscribe(  (response) => {
        console.log("Версію додано:", response);
      },
      (error) => {
        console.error("Помилка додання версії:", error);
      }
    );

      // Сбрасываем значения новой версии
      this.newVersion = new PersonFactVersionDTO();
      // Закрываем форму добавления новой версии
      this.isAddingNewVersion = false;
    } else {
      // Если не все поля заполнены, выведите сообщение или предпримите другие действия
      alert('Будь ласка, заповніть всі поля.');
    }
  }
    removeVersion(fact: PersonFactDTO, index: number) {
      if (confirm('Точно видалити версію?') && fact.versions) {
        const vId = fact.versions[index];
        this.personService.DeleteVersion(vId?.id)
        .subscribe(  (response) => {
          console.log("Версію додано:", response);
        },
        (error) => {
          console.error("Помилка видалення версії:", error);
        }
      );
        fact.versions.splice(index, 1);
      }
    }

    redirectToProfile(relativeId: string): void {
      this.router.navigateByUrl(`/person-profile/${relativeId}`).then(() => {
        this.location.go(`/person-profile/${relativeId}`);
      });
    }

    removeRelation(id: string) {
      if (confirm('Точно хочете видалити зв`язок між особами ?')) {
        this.personService.DeleteRelation(id)
        .subscribe(  (response) => {
          console.log("Зв'язок видалено:", response);
          window.location.reload();
        },
        (error) => {
          console.error("Помилка видалення зв'язку:", error);
        }
      );
      }
    }


    validate() {
      this.isVarning = this.isVarning ? false : true
    }
    deleteProfile() {
      if (confirm('Точно видалити цю особу?')) {
      this.personService.DeletePerson(this.editableProfile.id)
      .subscribe(  (response) => {
        console.log("Профіль видалено:", response);
        window.location.reload();
      },
      (error) => {
        console.error("Помилка видалення профілю:", error);
      }
    );
    }
    }
    saveProfile() {
      this.personService.updatePerson(this.editableProfile)
      .subscribe(  (response) => {
        console.log("Профіль оновлено:", response);
        this.personProfile = { ...this.editableProfile };
        this.isEditing = false;
        this.isVarning = false;
        this.get();
      },
      (error) => {
        console.error("Помилка оновлення профілю:", error);
      }
    );
    }


    redirectToConflictVersion(conflictVersion: ConflictVerDTO) {
      // Реализуйте перенаправление на страницу с конфликтной версией по ее идентификатору
      console.log('Перенаправление на версию с конфликтами', conflictVersion.conflictVersionId);
    }
    conflictVersion(conflictVersionId: string): number | null {
      for (let fact of this.personProfile.facts || []) {
        for (let versionIndex = 0; versionIndex < (fact.versions || []).length; versionIndex++) {
          if (fact.versions && fact.versions[versionIndex].id === conflictVersionId) {
            return versionIndex + 1;
          }
        }
      }
      return null; // If not found
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
          this.image = arrayBuffer;
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




    photosV: string[] = [
      'assets/images/v1.jpg',
      'assets/images/v2.jpg',
      'assets/images/v3.jpg'
    ];
    currentIndex: number = 0;
  
    get currentPhotoV(): string {
      return this.photosV[this.currentIndex];
    }
  
    prevPhotoV(): void {
      this.currentIndex = (this.currentIndex - 1 + this.photosV.length) % this.photosV.length;
    }
  
    nextPhotoV(): void {
      this.currentIndex = (this.currentIndex + 1) % this.photosV.length;
    }


    photosP: string[] = [
      'assets/images/p1.jpg',
      'assets/images/p2.jpg',
      'assets/images/p3.jpg'
    ];
  
    get currentPhotoP(): string {
      return this.photosP[this.currentIndex];
    }
  
    prevPhotoP(): void {
      this.currentIndex = (this.currentIndex - 1 + this.photosP.length) % this.photosP.length;
    }
  
    nextPhotoP(): void {
      this.currentIndex = (this.currentIndex + 1) % this.photosP.length;
    }
    deletePhoto() {
      if (confirm('Точно видалити це фото?')) {
      if (this.photosP.length > 0) {
        this.photosP.splice(this.currentIndex, 1);
        if (this.currentIndex >= this.photosP.length) {
          this.currentIndex = this.photosP.length - 1;
        }
      }
    }
    }
}
