import { Component, OnInit } from '@angular/core';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-person-panel',
  templateUrl: './person-panel.component.html',
  styleUrls: ['./person-panel.component.scss']
})
export class PersonPanelComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private dangkyhoc: DangKyHocService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  dsLopHoc: any;
  show = false;

  ngOnInit(): void {
    this.dangkyhoc.getByHocVien(this.loginAccount.TK_TenDangNhap).subscribe(
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
