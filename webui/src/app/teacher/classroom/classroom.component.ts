import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import Swal from 'sweetalert2';
import { NotifyFormComponent } from '../form/notify-form/notify-form.component';
import { ListStudentComponent } from '../list-student/list-student.component';

export interface dialogData {
  title: string;
  id: any;
  tbId: any;
  lhId: any;
  isUpdate: boolean;
}

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private lophoc: LopHocService,
    private dangkyhoc: DangKyHocService,
    private thongbao: ThongBaoService
  ) { }

  classInfo: any;
  soluong: any;
  lhId: any;
  dsThongBao: any;

  ngOnInit(): void {
    this.route.params.subscribe(
      (result) => {
        this.lhId = result.id;
        this.lophoc.getById(result.id).subscribe(
          (result) => {
            this.classInfo = result;
            this.dangkyhoc.getByLopHoc(result.LH_Id).subscribe(
              (result) => {
                this.soluong = result.siso;
              }
            );
          }
        );

        this.thongbao.getByLopHoc(result.id).subscribe(
          (result) => {
            this.dsThongBao = result;
            console.log(result);
          }
        );
      }
    );

  }

  editClick(tbId: any) {
    this.dialog.open(
      NotifyFormComponent,
      {
        data: { title: 'Đăng thông báo', id: this.lhId, tbId: tbId, isUpdate: true },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  showList() {
    this.dialog.open(
      ListStudentComponent,
      {
        data: { title: 'Danh sách học viên', id: this.lhId },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  addNotify() {
    this.dialog.open(
      NotifyFormComponent,
      {
        data: { title: 'Đăng thông báo', id: this.lhId, isUpdate: false },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  deleteClick(tbId: any) {
    Swal.fire({
      title: 'Xoá thông báo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.thongbao.deleteById(tbId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Xoá thành công'
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Lỗi!'
                });
              }
            }
          );
        }
      }
    );

  }

}
