import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MaterialModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';

//Component
import { ManagementComponent } from './management.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { StudentComponent } from './student/student.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { StudentFormComponent } from './form/student-form/student-form.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassFormComponent } from './form/class-form/class-form.component';
import { TeacherFormComponent } from './form/teacher-form/teacher-form.component';
import { TeacherInfomationComponent } from './teacher/teacher-infomation/teacher-infomation.component';

@NgModule({
  declarations: [
    ManagementComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    StudentComponent,
    StatisticalComponent,
    ContactComponent,
    LoginComponent,
    AccountComponent,
    StudentFormComponent,
    TeacherComponent,
    ClassFormComponent,
    TeacherFormComponent,
    TeacherInfomationComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // MaterialModule
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class ManagementModule { }
