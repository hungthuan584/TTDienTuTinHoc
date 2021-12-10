import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { dialogData } from '../classroom/classroom.component';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StudentInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    private hocvien: HocVienService,
    private hinhanh: HinhAnhService
  ) { }

  studentInfo: any;
  imageUrl: any;

  ngOnInit(): void {
    this.hocvien.getById(this.data.id).subscribe(
      (result) => {
        this.studentInfo = result;
        this.imageUrl = this.hinhanh.getAvatar(result.TK_AnhDaiDien);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}
