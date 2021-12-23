import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import Swal from 'sweetalert2';
import { ClassFormComponent } from '../../form/class-form/class-form.component';
import { TeachingFormComponent } from '../../form/teaching-form/teaching-form.component';
import { NotifyComponent } from '../../notify/notify.component';
import { ClassListComponent } from '../class-list/class-list.component';
import { InfoClassComponent } from '../info-class/info-class.component';

@Component({
  selector: 'app-opening-class',
  templateUrl: './opening-class.component.html',
  styleUrls: ['./opening-class.component.scss']
})
export class OpeningClassComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private lophoc: LopHocService
  ) { }

  displayedColumns: string[] = ['stt', 'id', 'tenlop', 'thoigianhoc', 'ngaykhaigiang', 'soluong', 'phonghoc', 'giaovien', 'status', '#'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.lophoc.getOpening().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  addClick() {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Thêm lớp học' },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  teachClick(lhId: string) {
    this.dialog.open(
      TeachingFormComponent,
      {
        data: { title: 'Phân công giảng dạy', lhId: lhId, isUpdate: false },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  editTeaching(lhId: string) {
    this.dialog.open(
      TeachingFormComponent,
      {
        data: { title: 'Chỉnh sửa phân công giảng dạy', lhId: lhId, isUpdate: true },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  lockClick(lhId: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Khoá đăng ký lớp học',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Khoá',
      cancelButtonText: 'Huỷ'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.lophoc.deActivate(lhId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã khoá đăng ký'
                }).then(
                  () => {
                    window.location.reload();
                  }
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: result.message
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

  unlockClick(lhId: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Mở đăng ký lớp học',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mở',
      cancelButtonText: 'Huỷ'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.lophoc.activeRegister(lhId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã mở đăng ký'
                }).then(
                  () => {
                    window.location.reload();
                  }
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: result.message
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

  infoClick(id: string) {
    this.dialog.open(
      InfoClassComponent,
      {
        data: { title: 'Thông tin lớp học', lhId: id },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  postNotify(lhId: string) {
    this.dialog.open(
      NotifyComponent,
      {
        data: { title: 'Nội dung thông báo', lhId: lhId },
        autoFocus: false,
        restoreFocus: false
      }
    )
  }

  editClick(id: string) {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Sửa thông tin lớp học', lhId: id },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    )
  }

  completeClick(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Hoàn thành lớp học',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hoàn thành',
      cancelButtonText: 'Huỷ'
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

}
