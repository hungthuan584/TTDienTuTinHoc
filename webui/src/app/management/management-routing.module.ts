import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFunctionGuard } from '../protected-routing/auth-function.guard';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './management.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children:
      [
        { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
        { path: 'trang-chu', component: HomeComponent },
        { path: 'bai-viet', component: PostComponent, canActivate: [AuthFunctionGuard], data: { functionId: 3 } },
        { path: 'hoc-vien', component: StudentComponent, canActivate: [AuthFunctionGuard], data: { functionId: 5 } },
        { path: 'lien-he', component: ContactComponent, canActivate: [AuthFunctionGuard], data: { functionId: 6 } },
        { path: 'tai-khoan', component: AccountComponent, canActivate: [AuthFunctionGuard], data: { functionId: 8 } },
        { path: 'thong-ke', component: StatisticalComponent, canActivate: [AuthFunctionGuard], data: { functionId: 9 } },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
