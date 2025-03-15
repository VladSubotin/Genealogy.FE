import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyUsersDTO, FamilyMemberToAddDTO } from '../members/members.interface'
import { MemberService } from '../members/members.service'
import { PersonFactOpitonsDTO, PersonMainInfoDTO, PersonOptionsDTO, PersonRelativeDTO, PersonRelativeOptionsDTO, FactShortInfoDTO } from './research.interface';
import { ResearchService } from './research.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {
  persons: PersonMainInfoDTO[] = [];
  personOptions: PersonOptionsDTO = new PersonOptionsDTO();

  constructor(private researchService: ResearchService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    
  }

  invalidFactIndices: number[] = [];
  dateRangeValidator(dateFrom: string, dateTo: string) {
    return dateFrom && dateTo && dateFrom > dateTo ? { dateRange: true } : null;
  }

  getPersons() {
    this.invalidFactIndices = [];
    if (this.personOptions.facts) {
      this.personOptions.facts.forEach((fact, index) => {
        if (fact.dateFrom && fact.dateTo && fact.dateFrom > fact.dateTo ? { dateRange: true } : null) {
          this.invalidFactIndices.push(index);
        }
      });
    }
    if (this.invalidFactIndices.length === 0) {
      this.researchService.getPersons(this.personOptions).subscribe(
        (data: PersonMainInfoDTO[]) => {
          this.persons = data;
          //this.totalItems = this.persons.length;
          //this.setPage(1);
          console.log('Persons:', this.persons);
        },
        error => {
          console.error('Error fetching persons:', error);
        }
      );
    }
  }

  free() {
    this.personOptions = new PersonOptionsDTO();
  }

  addFactOption() {
    this.personOptions.facts?.push(new PersonFactOpitonsDTO());
  }

  deleteFactOption(index: number) {
    this.personOptions.facts?.splice(index, 1);
  }

  getPerson(id: string) {
    this.router.navigateByUrl(`/person-profile/${id}`).then(() => {
      this.location.go(`/person-profile/${id}`);
    });
  }

  navigateToFamilyProfile(id: string | null | undefined) {
    this.router.navigate(['/family-profile', id]);
  }

  itemsPerPage: number = 10; // Количество элементов на странице
  currentPage: number = 1; // Текущая страница
}
