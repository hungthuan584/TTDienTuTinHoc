import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import Swal from 'sweetalert2';
import { ClassDialogData } from '../classroom.component';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'id', 'hoten', 'gioitinh', '#'];
  dataSource!: MatTableDataSource<any>;
  class: any;
  number: any;
  constructor(
    public dialogRef: MatDialogRef<ClassListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData,

    private dangkyhoc: DangKyHocService,
    private lophoc: LopHocService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.lophoc.getById(this.data.lhId).subscribe(
      (result) => {
        this.class = result;
      }
    );
    this.dangkyhoc.getByLopHoc(this.data.lhId).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  deleteClick(id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Xoá học viên khỏi lớp?',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dangkyhoc.deleteByStudent(id).subscribe(
            (result) => {
              if (result == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Xoá thành công'
                }).then(
                  () => {
                    this.ngOnInit();
                  }
                );
              }
            }
          );
        }
      }
    );
  }

  closeClick() {
    this.dialogRef.close();
  }

}
