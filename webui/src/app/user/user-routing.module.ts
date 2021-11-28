import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../protected-routing/auth.guard';
import { AdmissionsComponent } from './admissions/admissions.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
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
        { path: 'lien-he', component: ContactComponent },
        { path: 'ca-nhan', loadChildren: () => import('./person/person.module').then(m => m.PersonModule), canActivate: [AuthGuard] }

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
