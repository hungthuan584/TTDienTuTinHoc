import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { image } from 'src/app/_helpers/image.const';
import { ProfileDialogData } from '../header/header.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { ChangeInfoComponent } from './change-info/change-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,

    public dialog: MatDialog,
    private nhanvien: NhanVienService,
    private tokenStorage: TokenStorageService,
    private image: HinhAnhService,
    private sanitizer: DomSanitizer
  ) { }

  loginAccount = this.tokenStorage.getUser();
  imageUrl: any;
  info: any;

  ngOnInit(): void {
    this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.info = result;
        this.imageUrl = this.image.getAvatar(result.TK_AnhDaiDien);
      }
    );


  }

  changeAvatar() {
    this.dialog.open(
      ChangeAvatarComponent,
      {
        data: {
          title: 'Đổi ảnh đại diện'
        },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      ChangeInfoComponent,
      {
        data: {
          title: 'Thay đổi thông tin',
          id: id
        },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  changePassword(username: any) {
    this.dialog.open(
      ChangePasswordComponent,
      {
        data: {
          title: 'Đổi mật khẩu',
          id: username
        },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

}
