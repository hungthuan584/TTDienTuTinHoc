import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEducateComponent } from './add-edit-educate/add-edit-educate.component';

@Component({
  selector: 'app-educate',
  templateUrl: './educate.component.html',
  styleUrls: ['./educate.component.scss']
})
export class EducateComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addEducate() {
    const dialogRef = this.dialog.open(
      AddEditEducateComponent,
      {
        disableClose: true,
        data: {title:'Thêm chương trình đào tạo'}
      }
    );

  }
}
