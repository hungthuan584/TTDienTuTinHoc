import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeThongService } from 'src/app/services/he-thong.service';
import { HoaDonService } from 'src/app/services/hoa-don.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { billDialogData } from '../bill.component';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class BillInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BillInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: billDialogData,

    private hoadon: HoaDonService,
    private hethong: HeThongService
  ) { }
  bill: any;
  center: any;

  ngOnInit(): void {
    console.log(this.data);
    this.hoadon.getById(this.data.id).subscribe(
      (result) => {
        this.bill = result;
      }
    );
    this.hethong.getInfo().subscribe(
      (result) => {
        this.center = result;
      }
    )
  }

  confirmPayment(hdId: any) {
    Swal.fire({
      title: 'Xác nhận thanh toán hoá đơn?',
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
                  title: 'Xác nhận'
                }).then(
                  () => {
                    this.dialogRef.close();
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

  deleteClick() {

  }

  closeClick() {
    this.dialogRef.close();
  }

}
