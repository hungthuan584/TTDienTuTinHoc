import { Component, OnInit } from '@angular/core';
import { HeThongService } from 'src/app/services/he-thong.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService,
    private hethong: HeThongService
  ) { }

  logoSrc: any;
  statisticalShow = false;
  examShow = false;
  info: any;


  loginAccount = this.tokenStorage.getUser();

  ngOnInit(): void {
    this.hethong.getInfo().subscribe(
      (result) => {
        this.info = result;
        this.logoSrc = this.hethong.getImage(result.Logo);
      }
    );
  }

  statisticalShowClick() {
    if (this.statisticalShow == true) {
      this.statisticalShow = false;
    } else {
      this.statisticalShow = true;
    }
  }

  examShowClick() {
    if (this.examShow == true) {
      this.examShow = false;
    } else {
      this.examShow = true;
    }
  }

}
