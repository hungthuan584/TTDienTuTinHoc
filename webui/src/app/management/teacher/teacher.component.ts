import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { TeacherFormComponent } from '../form/teacher-form/teacher-form.component';
import { TeacherInfomationComponent } from './teacher-infomation/teacher-infomation.component';

export interface teacherDialogData {
  title: string;
  id: string;
}

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'id', 'taikhoan', 'hoten', 'gioitinh', 'diachi', 'sdt', 'email', '#'];
  dataSource!: MatTableDataSource<any>;
  total!: number;

  constructor(
    public dialog: MatDialog,
    private giaovien: GiaoVienService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.giaovien.getAll().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.total = data.length;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  addClick() {
    this.dialog.open(
      TeacherFormComponent,
      {
        data: { title: 'Thêm giáo viên' },
        autoFocus: false
      },
    );
  }

  infoClick(id: any) {
    this.dialog.open(
      TeacherInfomationComponent,
      {
        data: {
          title: 'Thông tin giáo viên',
          id: id
        },
        autoFocus: false
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      TeacherFormComponent,
      {
        data: {
          title: 'Sửa thông tin giáo viên',
          id: id
        },
        autoFocus: false
      }
    );
  }

  deleteClick(id: any) {

  }

}
