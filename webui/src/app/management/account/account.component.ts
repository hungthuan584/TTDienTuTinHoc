import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



export interface DialogData {
  title: string;
  TaiKhoan: any;
  username: string;
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  title = 'Thêm tài khoản';
  TaiKhoan: any;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addClick(): void {
    
  }
}
