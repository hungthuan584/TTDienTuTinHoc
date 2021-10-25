import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';


@Component({
  selector: 'app-student-account-list',
  templateUrl: './student-account-list.component.html',
  styleUrls: ['./student-account-list.component.scss']
})

export class StudentAccountListComponent implements OnInit {

  listTaiKhoan :any = [];
  title!: string;

  constructor(
    private _taikhoanService: TaiKhoanService
  ) { }

  public ngOnInit(): void {
    this._taikhoanService.getTaiKhoanHocVien().subscribe(
      (dsTaiKhoan: any) => this.listTaiKhoan = dsTaiKhoan,
      (err: any) => console.log(err)
    );
  }

  clickInfoButton(username: string) {

  }

  clickEditButton(username: string) {
    
  }

  clickResetPassButton() {

  }

  clickBlockedButton() {

  }

}