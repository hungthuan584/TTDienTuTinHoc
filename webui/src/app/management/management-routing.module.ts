import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management.component';
import { PostComponent } from './post/post.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children:
      [
        { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
        { path: 'trang-chu', component: HomeComponent },
        { path: 'bai-viet', component: PostComponent },
        { path: 'giao-vien', component: TeacherComponent },
        { path: 'hoc-vien', component: StudentComponent },
        { path: 'lien-he', component: ContactComponent },
        { path: 'tai-khoan', component: AccountComponent },
        { path: 'thong-ke', component: StatisticalComponent },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
