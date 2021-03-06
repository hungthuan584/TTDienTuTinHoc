import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { LopDaoTaoService } from 'src/app/services/lop-dao-tao.service';
import { ThongKeService } from 'src/app/services/thong-ke.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-by-student',
  templateUrl: './by-student.component.html',
  styleUrls: ['./by-student.component.scss']
})
export class ByStudentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private lopdaotao: LopDaoTaoService,
    private kythi: KyThiService,
    private thongke: ThongKeService,
    private exportExcel: ExportExcelService,
    private chungchi: ChungChiService
  ) { }

  displayedColumns: string[] = ['stt', 'id', 'hoten', 'gioitinh', 'noisinh', 'mssv', 'lophoc', 'chungchi', 'lythuyet', 'thuchanh', 'ketquathi'];
  dataSource!: MatTableDataSource<any>;

  searchForm!: FormGroup;
  dsLopDaoTao: any;
  dsKyThi: any;
  dsChungChi: any;
  exportData: any[] = [];
  saveData: any;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      FromDay: [''],
      ToDay: [''],
      HocPhi: [''],
      SinhVien: [''],
      HocVien: [''],
      LDT_Id: [''],
      CC_Id: [''],
      KQ_DanhGia: [''],
      DKT_IsConfirm: ['']
    });

    this.lopdaotao.getAll().subscribe(
      (result) => {
        this.dsLopDaoTao = result;
      }
    );

    this.kythi.getAll().subscribe(
      (result) => {
        this.dsKyThi = result;
      }
    );
    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

    this.thongke.getByHocVien(this.searchForm.value).subscribe(
      (result) => {
        if (result.status == 1) {
          this.dataSource = new MatTableDataSource(result.data);
          this.setValue(result.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: result.message
          });
        }
      }
    );

  }

  setValue(data: []) {
    this.saveData = data;
    this.exportData = [];
    for (let i = 0; i < this.saveData.length; i++) {
      let gioitinh = '';
      let lophoc = '';
      let danhgia = '';
      if (this.saveData[i].HV_GioiTinh == 1) {
        gioitinh = 'Nam';
      } else {
        gioitinh = 'N???';
      }

      if (!this.saveData[i].LH_Id) {
        lophoc = 'Th?? sinh t??? do';
      } else {
        lophoc = `${this.saveData[i].LH_Id} - ${this.saveData[i].LDT_Ten}`
      }
      if (!this.saveData[i].KQ_DanhGia) {
        danhgia = 'Ch??a c?? k???t qu???';
      } else {
        if (this.saveData[i].KQ_DanhGia == 1) {
          danhgia = '?????u';
        } else {
          danhgia = 'R???t';
        }
      }

      this.exportData.push({
        'M?? h???c vi??n': this.saveData[i].HV_Id,
        'H??? t??n': this.saveData[i].HV_HoTen,
        'Gi???i t??nh': gioitinh,
        'L???p h???c': lophoc,
        'Ch???ng ch??? d??? thi': this.saveData[i].CC_Ten,
        '??i???m l?? thuy???t': this.saveData[i].KQ_LyThuyet,
        '??i???n th???c h??nh': this.saveData[i].KQ_ThucHanh,
        'K???t qu???': danhgia
      });
    }
  }

  export() {
    let filename = prompt("Nh???p t??n file", "");
    if (filename != '' && filename != null) {
      this.exportExcel.exportExcel(this.exportData, `${filename}`);
    } else {
      if (filename == '') {
        alert('Vui l??ng nh???p t??n file');
      }
    }
  }

  onSubmit() {
    this.thongke.getByHocVien(this.searchForm.value).subscribe(
      (result) => {
        if (result.status == 1) {
          this.dataSource = new MatTableDataSource(result.data);
          this.setValue(result.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: result.message
          });
        }
      }
    );
  }

  reset() {
    this.searchForm.reset();
    this.thongke.getByHocVien(this.searchForm.value).subscribe(
      (result) => {
        if (result.status == 1) {
          this.dataSource = new MatTableDataSource(result.data);
          this.setValue(result.data);
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
