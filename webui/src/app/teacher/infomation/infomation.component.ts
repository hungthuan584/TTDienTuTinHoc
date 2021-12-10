import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ChangeAvatarComponent } from '../form/change-avatar/change-avatar.component';
import { ChangeInfomationComponent } from '../form/change-infomation/change-infomation.component';

@Component({
  selector: 'app-infomation',
  templateUrl: './infomation.component.html',
  styleUrls: ['./infomation.component.scss']
})
export class InfomationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private giaovien: GiaoVienService,
    private hinhanh: HinhAnhService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  teacherInfo: any;
  imageUrl: any;

  ngOnInit(): void {
    this.giaovien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        console.log(result);
        this.teacherInfo = result;
        this.imageUrl = this.hinhanh.getAvatar(result.TK_AnhDaiDien);
      }
    );
  }

  changeAvatar() {
    this.dialog.open(
      ChangeAvatarComponent,
      {
        data: { title: 'Đổi ảnh đại diện' },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  changeInfo() {
    this.dialog.open(
      ChangeInfomationComponent,
      {
        data: { title: 'Sửa thông tin' },
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
