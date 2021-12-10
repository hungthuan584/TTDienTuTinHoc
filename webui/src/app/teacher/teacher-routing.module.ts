import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom/classroom.component';
import { ChangePasswordComponent } from './form/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { InfomationComponent } from './infomation/infomation.component';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children:
      [
        { path: '', redirectTo: 'lop-hoc', pathMatch: 'full' },
        { path: 'lop-hoc', component: HomeComponent },
        { path: 'lop-hoc/:id', component: ClassroomComponent },
        { path: 'thong-tin-ca-nhan', component: InfomationComponent },
        { path: 'doi-mat-khau', component: ChangePasswordComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
