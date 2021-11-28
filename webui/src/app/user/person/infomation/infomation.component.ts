import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ChangeAvatarComponent } from '../../form/change-avatar/change-avatar.component';
import { ChangeInfoComponent } from '../../form/change-info/change-info.component';
import { image } from 'src/app/_helpers/image.const';
import { DomSanitizer } from '@angular/platform-browser';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';

export interface InfoDialogData {
  title: string,
  id: string
}

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss']
})
export class InfomationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private hocvien: HocVienService,
    private tokenStorage: TokenStorageService,
    private image: HinhAnhService,
    private sanitizer: DomSanitizer
  ) { }

  loginAccount = this.tokenStorage.getUser();
  loginUserInfo: any;
  imageUrl: any;

  ngOnInit(): void {
    this.hocvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.loginUserInfo = result;
        this.imageUrl = this.image.getAvatar(result.TK_AnhDaiDien);
      }
    );
  }

  changeInfo() {
    this.dialog.open(
      ChangeInfoComponent,
      {
        data: { title: 'Sửa thông tin', id: this.loginAccount.TK_TenDangNhap },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  changeAvatar() {
    this.dialog.open(
      ChangeAvatarComponent,
      {
        data: { title: 'Đổi ảnh đại diện', id: this.loginAccount.TK_TenDangNhap },
        autoFocus: false,
        restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

}
