import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'chungchitinhoc', pathMatch: 'full' },
  { path: 'chungchitinhoc', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  
  { path: 'quantrihethong', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
