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

import { ReactiveFormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';

//Component
import { ManagementComponent } from './management.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { LicenseComponent } from './license/license.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { FunctionComponent } from './function/function.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ExamCommitteeComponent } from './exam-committee/exam-committee.component';
import { StudentComponent } from './student/student.component';
import { ExamComponent } from './exam/exam.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ContactComponent } from './contact/contact.component';
import { EducateComponent } from './educate/educate.component';
import { AddEditEducateComponent } from './educate/add-edit-educate/add-edit-educate.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { StudentAccountListComponent } from './account/student-account-list/student-account-list.component';
import { AddAccountComponent } from './account/add-account.component';




@NgModule({
  declarations: [
    ManagementComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    LicenseComponent,
    PostCategoryComponent,
    FunctionComponent,
    CertificateComponent,
    ExamCommitteeComponent,
    StudentComponent,
    ExamComponent,
    StatisticalComponent,
    ContactComponent,
    EducateComponent,
    AddEditEducateComponent,
    LoginComponent,
    AccountComponent,
    StudentAccountListComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
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
    MatSelectModule
  ]
})
export class ManagementModule { }
