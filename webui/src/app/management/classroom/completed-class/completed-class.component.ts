import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { ClassListComponent } from '../class-list/class-list.component';
import { InfoClassComponent } from '../info-class/info-class.component';

@Component({
  selector: 'app-completed-class',
  templateUrl: './completed-class.component.html',
  styleUrls: ['./completed-class.component.scss']
})
export class CompletedClassComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'id', 'tenlop', 'thoigianhoc', 'ngaykhaigiang', 'soluong', 'phonghoc', 'giaovien', '#'];
  dataSource!: MatTableDataSource<any>;
  constructor(
    public dialog: MatDialog,
    private lophoc: LopHocService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.lophoc.getCompleted().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
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

  showListStudent(lhId: any) {
    this.dialog.open(
      ClassListComponent,
      {
        data: {
          title: 'Danh sách học viên',
          lhId: lhId
        },
        autoFocus: false,
        restoreFocus: false
      }
    );
  }

}
