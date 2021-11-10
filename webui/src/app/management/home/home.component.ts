import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { ClassFormComponent } from '../form/class-form/class-form.component';

export interface classDialogData {
  title: string;
  lh_id: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['stt', 'id', 'ten', 'phong', 'giaovien', 'siso', 'ngayhoc', 'giohoc', 'khaigiang', '#'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private lophoc: LopHocService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.lophoc.getAll().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  addClick() {
    this.dialog.open(
      ClassFormComponent,
      {
        data: { title: 'Thêm lớp học' }
      }
    )
  }

}
