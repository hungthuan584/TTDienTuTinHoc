import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HoaDonService } from 'src/app/services/hoa-don.service';
import { BillInfoComponent } from './bill-info/bill-info.component';

export interface billDialogData {
  title: string;
  id: string;
  hvId: string;
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private hoadon: HoaDonService
  ) { }

  displayedColumns: string[] = ['stt', 'id', 'hoten', 'gioitinh', 'noidung', 'ngaydangky', 'sotien', 'status', '#'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.hoadon.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
      }
    );
  }

  infoClick(hdId: any) {
    this.dialog.open(
      BillInfoComponent,
      {
        data: {
          title: 'Chi tiết hoá đơn',
          id: hdId
        }, autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  cancelClick(hdId: any) {

  }

}
