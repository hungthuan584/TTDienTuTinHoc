import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { StudentFormComponent } from '../form/student-form/student-form.component';

export interface studentDialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'TK_TenDangNhap', 'HV_Id', 'HV_HoTen', 'HV_GioiTinh', 'HV_NoiSinh', 'HV_Sdt', 'HV_Email', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private hocvien: HocVienService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  ngOnInit(): void {
    this.hocvien.getAll().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  addClick() {
    this.dialog.open(
      StudentFormComponent,
      {
        data: { title: 'Thêm học viên' }
      }
    );
  }

}
