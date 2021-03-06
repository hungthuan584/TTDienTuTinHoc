import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import Swal from 'sweetalert2';
import { ClassFormComponent } from '../../form/class-form/class-form.component';
import { ClassListComponent } from '../class-list/class-list.component';
import { ClassDialogData } from '../classroom.component';

@Component({
  selector: 'app-info-class',
  templateUrl: './info-class.component.html',
  styleUrls: ['./info-class.component.scss']
})
export class InfoClassComponent implements OnInit {

  lophocInfo: any;
  number: any;
  constructor(
    public dialogRef: MatDialogRef<InfoClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData,

    public dialog: MatDialog,
    private lophoc: LopHocService,
    private dangkyhoc: DangKyHocService
  ) { }

  ngOnInit(): void {
    this.lophoc.getById(this.data.lhId).subscribe(
      (result) => {
        this.lophocInfo = result;
      }
    );

    this.dangkyhoc.getByLopHoc(this.data.lhId).subscribe(
      (result) => {
        this.number = result.siso;
      }
    );
  }

  editClick(id: string) {
    this.dialog.open(
      ClassFormComponent,
      {
        data: {
          title: 'Sửa thông tin lớp học',
          lhId: id
        },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  completeClick(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Hoàn thành lớp học',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hoàn thành'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.lophoc.isComplete(id).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã hoàn thành',
                  showConfirmButton: true
                }).then(
                  () => {
                    window.location.reload();
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  showListStudent(lhId: any) {
    this.dialog.open(
      ClassListComponent,
      {
        data: {
          title: 'Danh sách học viên',
          lhId: lhId
        },
        autoFocus: false,
        restoreFocus: false
      }
    );
  }

  closeClick() {
    this.dialogRef.close();
  }
}
