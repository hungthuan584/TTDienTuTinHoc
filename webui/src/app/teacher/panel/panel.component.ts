import { Component, OnInit } from '@angular/core';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
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
    private dangkyhoc: DangKyHocService,
    private lophoc: LopHocService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  dsLopHoc: any;
  show = false;

  ngOnInit(): void {
    this.lophoc.getByTeacher(this.loginAccount.TK_TenDangNhap).subscribe(
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
