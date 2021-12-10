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
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPrintModule } from 'ngx-print';

import { ManagementRoutingModule } from './management-routing.module';

//Component
import { ManagementComponent } from './management.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { PostComponent } from './post/post.component';
import { StudentComponent } from './student/student.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from '../login/login.component';
import { AccountComponent } from './account/account.component';
import { StudentFormComponent } from './form/student-form/student-form.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassFormComponent } from './form/class-form/class-form.component';
import { TeacherFormComponent } from './form/teacher-form/teacher-form.component';
import { TeacherInfomationComponent } from './teacher/teacher-infomation/teacher-infomation.component';
import { InfoClassComponent } from './classroom/info-class/info-class.component';
import { StudentInfomationComponent } from './student/student-infomation/student-infomation.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './form/employee-form/employee-form.component';
import { EmployeeInfomationComponent } from './employee/employee-infomation/employee-infomation.component';
import { PermissionComponent } from './permission/permission.component';
import { ClassListComponent } from './classroom/class-list/class-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeInfoComponent } from './profile/change-info/change-info.component';
import { ChangeAvatarComponent } from './profile/change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { NotifyComponent } from './notify/notify.component';
import { AddNotifyComponent } from './form/add-notify/add-notify.component';
import { ReplyContactComponent } from './form/reply-contact/reply-contact.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { TeachingFormComponent } from './form/teaching-form/teaching-form.component';
import { PostFormComponent } from './form/post-form/post-form.component';
import { BillComponent } from './bill/bill.component';
import { ExamComponent } from './exam/exam.component';
import { BillInfoComponent } from './bill/bill-info/bill-info.component';

@NgModule({
  declarations: [
    ManagementComponent,
    SidenavComponent,
    HeaderComponent,
    ClassroomComponent,
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
    TeacherInfomationComponent,
    InfoClassComponent,
    StudentInfomationComponent,
    EmployeeComponent,
    EmployeeFormComponent,
    EmployeeInfomationComponent,
    PermissionComponent,
    ClassListComponent,
    ProfileComponent,
    ChangeInfoComponent,
    ChangeAvatarComponent,
    ChangePasswordComponent,
    NotifyComponent,
    AddNotifyComponent,
    ReplyContactComponent,
    SystemConfigComponent,
    TeachingFormComponent,
    PostFormComponent,
    BillComponent,
    ExamComponent,
    BillInfoComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,

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
    MatRadioModule,
    MatAutocompleteModule
  ]
})
export class ManagementModule { }
