import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFunctionGuard } from '../protected-routing/auth-function.guard';
import { RootAuthGuard } from '../protected-routing/root-auth.guard';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ManagementComponent } from './management.component';
import { PostComponent } from './post/post.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { StudentComponent } from './student/student.component';
import { SystemConfigComponent } from './system-config/system-config.component';
import { BillComponent } from './bill/bill.component';
import { ExamComponent } from './exam/exam.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children:
      [
        { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
        { path: 'trang-chu', component: ClassroomComponent },
        { path: 'cau-hinh-he-thong', component: SystemConfigComponent, canActivate: [RootAuthGuard] },
        { path: 'bai-viet', component: PostComponent, canActivate: [AuthFunctionGuard], data: { functionId: 1 } },
        { path: 'hoc-vien', component: StudentComponent, canActivate: [AuthFunctionGuard], data: { functionId: 2 } },
        { path: 'khoa-thi', component: ExamComponent, canActivate: [AuthFunctionGuard], data: { functionId: 2 } },
        { path: 'hoa-don', component: BillComponent, canActivate: [AuthFunctionGuard], data: { functionId: 4 } },
        { path: 'lien-he', component: ContactComponent, canActivate: [AuthFunctionGuard], data: { functionId: 5 } },
        { path: 'tai-khoan', component: AccountComponent, canActivate: [AuthFunctionGuard], data: { functionId: 6 } },
        { path: 'thong-ke', component: StatisticalComponent, canActivate: [AuthFunctionGuard], data: { functionId: 7 } },

      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
