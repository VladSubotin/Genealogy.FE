import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyUsersDTO, FamilyMemberToAddDTO } from './members.interface'
import { MemberService } from './members.service'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
  @Input() role: string = "Guest";
  @Input() familyId: string = "";

  members: FamilyUsersDTO[] = [];
  admin: FamilyUsersDTO = new FamilyUsersDTO();
  filteredMembers: FamilyUsersDTO[] = [];
  searchQuery: string = '';

  newMember: FamilyMemberToAddDTO = new FamilyMemberToAddDTO();
  addModalVisible = false;

  constructor(private memberService: MemberService, private router: Router) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers(this.familyId).subscribe(
      (data: FamilyUsersDTO[]) => {
        this.admin = data.filter(m => m.userRole === "Admin")[0];
        this.members = data.filter(m => m.userRole !== "Admin");
        this.filteredMembers = data.filter(m => m.userRole !== "Admin");
        console.log('Members:', this.members);
      },
      error => {
        console.error('Error fetching members:', error);
      }
    );
  }

  deleteMember(id: string | null | undefined) {
    if (confirm('Точно хочете видалити цього учасника?') && id !== null && id !== undefined) {
      this.memberService.deleteMember(id)
      .subscribe(  (response) => {
        console.log("учасника видалено:", response);
        this.getMembers();
      },
      (error) => {
        console.error("Помилка видалення учасника:", error);
      }
    );
    }
  }

alreadyExist = false;

  addMember() {
    if (this.members.filter(l => l.userLogin === this.newMember.userLogin).length > 0) {
      this.alreadyExist = true;
    }
    else {
      this.alreadyExist = false;
      this.newMember.familyId = this.familyId;
      this.memberService.addMember(this.newMember).subscribe( (response) => 
        {
          console.log('Member is added');
          this.getMembers();
        },
        error => {
          console.error('Error adding member:', error);
        }
      );
    }
  }
  addMemberStart() {
    this.addModalVisible = true;
  }
  cancelAdding() {
    this.alreadyExist = false;
    this.newMember = new FamilyMemberToAddDTO();
    this.addModalVisible = false;
  }

  seeMember(login: string | null | undefined) {
    if (login) {
      this.router.navigate(['/user-profile', login]);
    }
  }

  filterList() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.filteredMembers = this.members;
      return;
    }
    this.filteredMembers = this.members.filter(member => {
      const fullName = member.userName ? member.userName.toLowerCase() : '';
      const names = fullName.split(' ');
      return names.some(name => name.startsWith(query));
    });
  }

}
