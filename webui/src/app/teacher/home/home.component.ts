import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private giaovien: GiaoVienService,
    private lophoc: LopHocService,
    private image: HinhAnhService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  dsLopHoc: any;

  ngOnInit(): void {
    this.lophoc.getByTeacher(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.dsLopHoc = result;
        console.log(this.dsLopHoc);
      }
    );
  }

}
