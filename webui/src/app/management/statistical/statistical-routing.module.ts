import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByClassroomComponent } from './by-classroom/by-classroom.component';
import { ByStudentComponent } from './by-student/by-student.component';
import { ByTeacherComponent } from './by-teacher/by-teacher.component';
import { StatisticalComponent } from './statistical.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticalComponent,
    children: [
      { path: '', redirectTo: 'theo-lop-hoc', pathMatch: 'full' },
      { path: 'theo-lop-hoc', component: ByClassroomComponent },
      { path: 'theo-hoc-vien', component: ByStudentComponent },
      { path: 'theo-giao-vien', component: ByTeacherComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
