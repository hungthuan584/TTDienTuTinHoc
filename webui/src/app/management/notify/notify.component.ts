import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { ClassDialogData } from '../classroom/classroom.component';
import { AddNotifyComponent } from '../form/add-notify/add-notify.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NotifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData,
    public dialog: MatDialog,

    private tokenStorage: TokenStorageService,
    private thongbao: ThongBaoService,
  ) { }

  notify: any;
  lophoc: any;
  nullList: any;

  ngOnInit(): void {
    this.thongbao.getByLopHoc(this.data.lhId).subscribe(
      (result) => {
        this.notify = result;
        console.log(this.notify);
        if (result.length != 0) {
          this.nullList = false;
        } else {
          this.nullList = true;
        }
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      AddNotifyComponent,
      {
        data: { title: 'Chỉnh sửa thông báo', tbId: id, lhId: this.data.lhId },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );;
  }

  addClick() {
    this.dialog.open(
      AddNotifyComponent,
      {
        data: { title: 'Đăng thông báo', lhId: this.data.lhId },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  deleteClick(id: any) {
    Swal.fire({

    })
  }

  onCancel() {
    this.dialogRef.close();
  }
}
