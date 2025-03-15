import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { FamilyProfileComponent } from './family-profile/family-profile.component';
import { PersonProfileComponent } from './person-profile/person-profile.component'
import { FamiliesComponent } from './families/families.component'
import { MembersComponent } from './members/members.component'
import { TasksComponent } from './tasks/tasks.component'
import { ResearchComponent } from './research/research.component'
import { UserProfileComponent } from './user-profile/user-profile.component'

const routes: Routes = [
  {path: 'tree', component: TreeComponent},
  {path: 'family-profile/:id', component: FamilyProfileComponent},
  {path: 'person-profile/:id', component: PersonProfileComponent},
  {path: 'families', component: FamiliesComponent},
  {path: 'research', component: ResearchComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'user-profile/:id', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
