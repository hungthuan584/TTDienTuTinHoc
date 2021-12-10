import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaiVietService } from 'src/app/services/bai-viet.service';
import Swal from 'sweetalert2';
import { PostFormComponent } from '../form/post-form/post-form.component';

export interface postDialogData {
  title: string;
  id: any;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private baiviet: BaiVietService
  ) { }

  fileSrc: any;
  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['stt', 'tieude', '#',];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.baiviet.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  getUrl(filename: any) {
    return this.baiviet.getFile(filename);
  }

  addClick() {
    this.dialog.open(
      PostFormComponent,
      {
        data: { title: 'Đăng bài viết' },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  editClick(id: any) {
    this.dialog.open(
      PostFormComponent,
      {
        data: { title: 'Chỉnh sửa bài viết', id: id },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  deleteClick(id: any) {
    Swal.fire({

    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.baiviet.deleteById(id).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã xoá'
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
