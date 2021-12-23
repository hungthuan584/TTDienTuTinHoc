import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { GiaoVienService } from 'src/app/services/giao-vien.service';
import { LopDaoTaoService } from 'src/app/services/lop-dao-tao.service';
import { PhongHocService } from 'src/app/services/phong-hoc.service';
import { ThoiGianHocService } from 'src/app/services/thoi-gian-hoc.service';
import { ThongKeService } from 'src/app/services/thong-ke.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-by-classroom',
  templateUrl: './by-classroom.component.html',
  styleUrls: ['./by-classroom.component.scss']
})
export class ByClassroomComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private lopdaotao: LopDaoTaoService,
    private chungchi: ChungChiService,
    private phonghoc: PhongHocService,
    private giaovien: GiaoVienService,
    private thongke: ThongKeService,
    private exportExcel: ExportExcelService
  ) { }

  displayedColumns: string[] = ['stt', 'id', 'tenlop', 'thoigian', 'phonghoc', 'ngaykhaigiang', 'giaovien', 'hoanthanh'];
  dataSource!: MatTableDataSource<any>;

  dsLopDaoTao: any;
  dateForm!: FormGroup;
  dsChungChi: any;
  dsPhongHoc: any;
  dsGiaoVien: any;
  exportData: any[] = [];
  setDataToExport: any;

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      FromDay: [''],
      ToDay: [''],
      LDT_Id: [''],
      PH_Id: [''],
      GV_Id: [''],
      TrangThai: [''],
      CC_Id: ['']
    });

    this.lopdaotao.getAll().subscribe(
      (result) => {
        this.dsLopDaoTao = result;
      }
    );

    this.phonghoc.getAll().subscribe(
      (result) => {
        this.dsPhongHoc = result;
      }
    );

    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

    this.giaovien.getAll().subscribe(
      (result) => {
        this.dsGiaoVien = result;
      }
    );

    this.thongke.getByLopHoc(this.dateForm.value).subscribe(
      (result) => {
        if (result.status == 1) {
          this.dataSource = new MatTableDataSource(result.data);
          this.setExportValue(result.data);
        }
      }
    )
  }

  setExportValue(data: []) {
    this.setDataToExport = data;
    this.exportData = [];

    for (let i = 0; i < this.setDataToExport.length; i++) {

      let hoanthanh = 'Chưa hoàn thành';
      let giaovien = 'Chưa phân công';
      let hotengiaovien = 'Chưa phân công';

      if (this.setDataToExport[i].LH_IsComplete == 1) {
        hoanthanh = 'Đã hoàn thành';
      }

      if (this.setDataToExport[i].GV_Id != null) {
        giaovien = this.setDataToExport[i].GV_Id;
        hotengiaovien = this.setDataToExport[i].GV_HoTen;
      }

      this.exportData.push({
        'Mã Lớp': this.setDataToExport[i].LH_Id,
        'Tên lớp': this.setDataToExport[i].LDT_Ten,
        'Thời gian học': this.setDataToExport[i].TG_Ten,
        'Phòng học': this.setDataToExport[i].PH_Ten,
        'Mã giáo viên': giaovien,
        'Họ tên giáo viên': hotengiaovien,
        'Hoàn thành': hoanthanh,
      });
    }
  }

  onSubmit() {
    this.thongke.getByLopHoc(this.dateForm.value).subscribe(
      (result) => {
        if (result.status == 1) {
          this.dataSource = new MatTableDataSource(result.data);
          this.setExportValue(result.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: result.message
          });
        }
      }
    );
  }

  export() {
    let filename = prompt("Nhập tên file", "");
    if (filename != '' && filename != null) {
      this.exportExcel.exportExcel(this.exportData, `${filename}`);
    } else {
      if (filename == '') {
        alert('Vui lòng nhập tên file');
      }
    }
  }

  reset() {
    this.dateForm.reset();
    this.thongke.getByLopHoc(this.dateForm.value).subscribe(
      (result) => {
        if (result.status == 1) {
          this.dataSource = new MatTableDataSource(result.data);
          this.setExportValue(result.data);
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
