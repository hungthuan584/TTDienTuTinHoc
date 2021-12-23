import { Component, OnInit } from '@angular/core';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { GiangDayService } from 'src/app/services/giang-day.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private giangday: GiangDayService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  dsLopHoc: any;
  show = false;

  ngOnInit(): void {
    this.giangday.getByGV(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        this.dsLopHoc = result;
      }
    );
  }

  showList() {
    if (this.show == true) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

}
