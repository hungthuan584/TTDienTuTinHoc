import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmLogOutDialogData } from 'src/app/user/navbar/navbar.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmLogOutDialogData
  ) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.data.isLogOut = true;
    this.dialogRef.close({ data: this.data.isLogOut });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
