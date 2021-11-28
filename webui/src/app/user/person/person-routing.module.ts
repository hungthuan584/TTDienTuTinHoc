import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../form/change-password/change-password.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { InfomationComponent } from './infomation/infomation.component';
import { PersonComponent } from './person.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children:
      [
        { path: '', redirectTo: 'thong-tin', pathMatch: 'full' },
        { path: 'thong-tin', component: InfomationComponent },
        { path: 'lop-hoc/:LH_Id', component: ClassroomComponent },
        { path: 'doi-mat-khau', component: ChangePasswordComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
