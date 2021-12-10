import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../protected-routing/auth.guard';
import { ChildrenAuthGuard } from '../protected-routing/children-auth.guard';
import { AdmissionsComponent } from './admissions/admissions.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { NotifyDetailComponent } from './notification/notify-detail/notify-detail.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:
      [
        { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
        { path: 'trang-chu', component: HomeComponent },
        { path: 'chieu-sinh', component: AdmissionsComponent },
        { path: 'thong-bao', component: NotificationComponent },
        { path: 'thong-bao/:id', component: NotifyDetailComponent },
        { path: 'lien-he', component: ContactComponent },
        { path: 'ca-nhan', loadChildren: () => import('./person/person.module').then(m => m.PersonModule), canActivate: [ChildrenAuthGuard] }

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
