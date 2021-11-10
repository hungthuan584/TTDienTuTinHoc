import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { TeacherFormComponent } from '../../form/teacher-form/teacher-form.component';
import { teacherDialogData } from '../teacher.component';

@Component({
  selector: 'app-teacher-infomation',
  templateUrl: './teacher-infomation.component.html',
  styleUrls: ['./teacher-infomation.component.scss']
})
export class TeacherInfomationComponent implements OnInit {

  teacher: any;
  account: any;
  constructor(
    public dialogRef: MatDialogRef<TeacherInfomationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teacherDialogData,
    public dialog: MatDialog,
    private giaovien: GiaoVienService,
    private taikhoan: TaiKhoanService,
  ) { }

  ngOnInit(): void {
    this.giaovien.getById(this.data.id).subscribe(
      (result) => {
        this.teacher = result;
      }
    );
    this.taikhoan.getByUsername(this.data.id).subscribe(
      (result) => {
        this.account = result;
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      TeacherFormComponent,
      {
        data: {
          title: 'Sửa thông tin giáo viên',
          id: id
        },
        autoFocus: false
      }
    );
  }

  closeClick() {
    this.dialogRef.close();
  }

  lockAccount() {

  }
}
