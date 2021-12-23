import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GiangDayService } from 'src/app/services/giang-day.service';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { HinhAnhService } from 'src/app/services/hinh-anh.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private giangday: GiangDayService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  dsLopHoc: any;

  ngOnInit(): void {
    this.giangday.getByGV(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.dsLopHoc = result;
        console.log(this.dsLopHoc);
      }
    );
  }

}
