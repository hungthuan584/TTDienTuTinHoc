import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { LopDaoTaoService } from 'src/app/services/lop-dao-tao.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { StudentFormComponent } from '../form/student-form/student-form.component';

export interface StudentDialogData {
  title: string;
  id: string;
  hvId: string;
}

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements OnInit {

  status = this.tokenStorage.getStatus();
  loginAccount = this.tokenStorage.getUser();
  listLopHoc: any;
  listLopDaoTao: any;

  constructor(
    public dialog: MatDialog,
    private lopdaotao: LopDaoTaoService,
    private lophoc: LopHocService,
    private tokenStorage: TokenStorageService

  ) { }

  ngOnInit(): void {
    this.lophoc.getOpening().subscribe(
      (result) => {
        this.listLopHoc = result;
      }
    );

    this.lopdaotao.getAll().subscribe(
      (result) => {
        this.listLopDaoTao = result
      }
    );
  }

  registerClick(LH_Id: string) {
    if (this.status.includes('1')) {
      Swal.fire({
        icon: 'question',
        title: 'Đăng ký vào lớp học này?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng ký'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.dialog.open(
              StudentFormComponent,
              {
                data: { title: 'Đăng ký học', id: LH_Id, hvId: this.loginAccount.TK_TenDangNhap },
                autoFocus: false, restoreFocus: false
              },
            );
          }
        }
      );
    } else {
      this.dialog.open(
        StudentFormComponent,
        {
          data: { title: 'Đăng ký học', id: LH_Id },
          autoFocus: false,
          restoreFocus: false
        }
      );
    }
  }



}
