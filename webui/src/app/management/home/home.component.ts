import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { InfoClassComponent } from './info-class/info-class.component';
import { ClassFormComponent } from '../form/class-form/class-form.component';

export interface ClassDialogData {
  title: string;
  lhId: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'id', 'tenlop', 'thoigianhoc', 'ngaykhaigiang', 'soluong', 'phonghoc', 'giaovien', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private lophoc: LopHocService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) { }
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.lophoc.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );

    var loginUser = this.tokenStorage.getUser();

  }

  addClick() {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Thêm lớp học' },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  infoClick(id: string) {
    this.dialog.open(
      InfoClassComponent,
      {
        data: { title: 'Thông tin lớp học', lhId: id },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  editClick(id: string) {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Sửa thông tin lớp học', lhId: id },
        autoFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    )
  }

  completeClick(id: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Hoàn thành lớp học',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hoàn thành'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.lophoc.isComplete(id).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã hoàn thành',
                  showConfirmButton: true
                }).then(
                  () => {
                    window.location.reload();
                  }
                );
              }
            }
          );
        }
      }
    );
  }

}
