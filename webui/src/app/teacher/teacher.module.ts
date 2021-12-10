import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// MaterialModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from '../teacher/teacher.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PanelComponent } from './panel/panel.component';
import { HomeComponent } from './home/home.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { NotifyFormComponent } from './form/notify-form/notify-form.component';
import { ChangeAvatarComponent } from './form/change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './form/change-password/change-password.component';
import { ChangeInfomationComponent } from './form/change-infomation/change-infomation.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { InfomationComponent } from './infomation/infomation.component';



@NgModule({
  declarations: [
    TeacherComponent,
    NavbarComponent,
    PanelComponent,
    HomeComponent,
    ClassroomComponent,
    NotifyFormComponent,
    ChangeAvatarComponent,
    ChangePasswordComponent,
    ChangeInfomationComponent,
    ListStudentComponent,
    StudentInfoComponent,
    InfomationComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,

    ReactiveFormsModule,
    FormsModule,

    // MaterialModule
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ]
})
export class TeacherModule { }
