import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LopHocService } from 'src/app/services/lop-hoc.service';

export interface ClassDialogData {
  title: string;
  lhId: string;
  tbId: string;
  isUpdate: boolean;
}


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }
}
