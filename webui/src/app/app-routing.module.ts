import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConvertAddressComponent } from './convert-address/convert-address.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './protected-routing/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'chungchitinhoc', pathMatch: 'full' },
  { path: 'chungchitinhoc', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  { path: 'dang-nhap', component: LoginComponent },
  { path: 'quantrihethong', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule), canActivate: [AuthGuard] },
  { path: 'quanlylophoc', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule), canActivate: [AuthGuard] },
  { path: 'diachi', component: ConvertAddressComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
