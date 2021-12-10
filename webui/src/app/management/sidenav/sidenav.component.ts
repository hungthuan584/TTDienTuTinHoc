import { Component, OnInit } from '@angular/core';
import { LienHeService } from 'src/app/services/lien-he.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  contactNumber: any;
  loginAccount = this.tokenStorage.getUser();

  ngOnInit(): void {
  }

}
