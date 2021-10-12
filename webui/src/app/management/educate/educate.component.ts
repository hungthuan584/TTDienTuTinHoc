import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Educate } from 'src/app/models/Educate';
import { EducateService } from 'src/app/shared/educate.service';
import { AddEditEducateComponent } from './add-edit-educate/add-edit-educate.component';

@Component({
  selector: 'app-educate',
  templateUrl: './educate.component.html',
  styleUrls: ['./educate.component.scss']
})
export class EducateComponent implements OnInit {

  educates: Educate[] = [];

  constructor(private educateService: EducateService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.educateService.getEducates().subscribe((e: Educate[]) => {
      console.log(e);
      this.educates = e;
    });
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
