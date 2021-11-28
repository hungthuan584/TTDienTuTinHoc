import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { image } from 'src/app/_helpers/image.const';
import Swal from 'sweetalert2';
import { ProfileDialogData } from '../../header/header.component';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,

    private tokenStorage: TokenStorageService,
    private nhanvien: NhanVienService,
    private image: HinhAnhService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  imageUrl: any;

  ngOnInit(): void {
    this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.imageUrl = this.image.getAvatar(result.TK_AnhDaiDien);
      }
    );
  }

  onSelectFile($event: any) {
    var file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any) {
    this.imageUrl = ('data:image/png;base64,' + btoa(e.target.result));
  }

  onSubmit() {
    var data = {
      user: this.loginAccount.TK_TenDangNhap,
      base64: this.imageUrl
    }

    Swal.fire({
      title: 'Đổi ảnh đại diện?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Lưu'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.image.changeAvatar(data).subscribe(
            (result: any) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đổi ảnh đại diện'
                }).then(
                  () => {
                    this.dialogRef.close();
                  }
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Lỗi'
                });
              }
            }
          );
        }
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}
