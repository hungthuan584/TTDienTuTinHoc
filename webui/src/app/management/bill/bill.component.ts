import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HoaDonService } from 'src/app/services/hoa-don.service';
import Swal from 'sweetalert2';
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

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
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
        this.ngOnInit();
      }
    );
  }

  confirmClick(hdId: any) {
    Swal.fire({
      title: 'Đã thanh toán hoá đơn?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.hoadon.comfirmComplete(hdId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Xác nhận thành công'
                }).then(
                  () => {
                    this.ngOnInit();
                  }
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: result.message
                });
              }
            }
          );
        }
      }
    );
  }

  cancelClick(hdId: any) {
    Swal.fire({
      title: 'Huỷ hoá đơn?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Huỷ'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.hoadon.deleteById(hdId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Huỷ thành công'
                }).then(
                  () => {
                    this.ngOnInit();
                  }
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: result.message
                });
              }
            }
          );
        }
      }
    );
  }

}
