import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPanZoomModule } from 'ngx-panzoom';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { FamilyProfileComponent } from './family-profile/family-profile.component';
import { TreeComponent } from './tree/tree.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { FamiliesComponent } from './families/families.component';
import { MembersComponent } from './members/members.component';
import { TasksComponent } from './tasks/tasks.component';
import { ResearchComponent } from './research/research.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    FamilyProfileComponent,
    PersonProfileComponent,
    FamiliesComponent,
    MembersComponent,
    TasksComponent,
    ResearchComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxPanZoomModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    FamilyProfileComponent,
    PersonProfileComponent
  ]
})
export class AppModule { }
