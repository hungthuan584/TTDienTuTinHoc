import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducateComponent } from '../management/educate/educate.component';
import { AccountComponent } from './account/account.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ContactComponent } from './contact/contact.component';
import { ExamCommitteeComponent } from './exam-committee/exam-committee.component';
import { ExamComponent } from './exam/exam.component';
import { FunctionComponent } from './function/function.component';
import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management.component';
import { PostComponent } from './post/post.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children:
      [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'home', component: HomeComponent },
        { path: 'post', component: PostComponent },
        { path: 'license', component: LicenseComponent },
        { path: 'function', component: FunctionComponent },
        { path: 'certificate', component: CertificateComponent },
        { path: 'exam-committee', component: ExamCommitteeComponent },
        { path: 'educate', component: EducateComponent },
        { path: 'student', component: StudentComponent },
        { path: 'exam', component: ExamComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'taikhoan', component: AccountComponent },
        { path: 'statistical', component: StatisticalComponent },
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
