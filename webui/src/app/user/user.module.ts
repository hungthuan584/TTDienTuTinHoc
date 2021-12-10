import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

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


import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ScoreComponent } from './score/score.component';
import { AdmissionsComponent } from './admissions/admissions.component';
import { ChangeInfoComponent } from './form/change-info/change-info.component';
import { ChangePasswordComponent } from './form/change-password/change-password.component';
import { StudentFormComponent } from './form/student-form/student-form.component';
import { ChangeAvatarComponent } from './form/change-avatar/change-avatar.component';
import { ContactFormComponent } from './form/contact-form/contact-form.component';
import { NotificationComponent } from './notification/notification.component';
import { NotifyDetailComponent } from './notification/notify-detail/notify-detail.component';



@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    BannerComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    ScoreComponent,
    AdmissionsComponent,
    StudentFormComponent,
    ChangeInfoComponent,
    ChangePasswordComponent,
    ChangeAvatarComponent,
    ContactFormComponent,
    NotificationComponent,
    NotifyDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatAutocompleteModule
  ]
})
export class UserModule { }
