import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITaiKhoan } from 'src/app/models/ITaiKhoan';
import { AddAccountComponent } from './add-account.component';



export interface DialogData {
  title: string;
  TaiKhoan: ITaiKhoan;
  username: string;
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  title = 'Thêm tài khoản';
  TaiKhoan!: ITaiKhoan;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addClick(): void {
    this.dialog.open(
      AddAccountComponent, {
      data: { title: this.title }
    });
  }
}
