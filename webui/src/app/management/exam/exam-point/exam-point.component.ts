import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { DanhSachPhongThiService } from 'src/app/services/danh-sach-phong-thi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { PhongHocService } from 'src/app/services/phong-hoc.service';
import Swal from 'sweetalert2';
import { KetQuaThiService } from 'src/app/services/ket-qua-thi.service';
import { MatDialog } from '@angular/material/dialog';
import { PointFormComponent } from '../../form/point-form/point-form.component';

export interface pointDialogData {
  title: string;
  hvId: string;
  ktId: string;
  isUpdate: boolean
}

@Component({
  selector: 'app-exam-point',
  templateUrl: './exam-point.component.html',
  styleUrls: ['./exam-point.component.scss']
})
export class ExamPointComponent implements OnInit {
  sortForm!: FormGroup;
  dsDotThi: any;
  dsKyThi: any;
  dsPhongHoc: any;
  selectedDotThi: any;
  dsHocVien: any = [];
  dataExport: any = [];
  dataExcel: any = [];

  constructor(
    public dialog: MatDialog,
    private dotthi: DotThiService,
    private fb: FormBuilder,
    private kythi: KyThiService,
    private phonghoc: PhongHocService,
    private danhsachphongthi: DanhSachPhongThiService,
    private exportExcel: ExportExcelService,
    private ketquathi: KetQuaThiService
  ) { }

  displayedColumns: string[] = ['stt', 'id', 'hoten', 'gioitinh', 'ngaysinh', 'noisinh', 'cmnd', 'chungchi', 'kythi', 'module', 'phongthi', 'lythuyet', 'thuchanh', 'ketqua', '#'];
  dataSource!: MatTableDataSource<any>;
  checkImport = true;

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      DT_Id: [''],
      KT_Id: [''],
      PH_Id: ['']
    });

    this.dotthi.getAll().subscribe(
      (result) => {
        this.dsDotThi = result;
        this.setValue(result[0]);
        this.getValue(result[0]);
      }
    );

    this.phonghoc.getAll().subscribe(
      (result) => {
        this.dsPhongHoc = result;
      }
    );
  }

  changeDotThi($event: any) {
    this.kythi.getByDotThi($event.value).subscribe(
      (result) => {
        this.dsKyThi = result;
      }
    );
    this.getValue(this.sortForm.value);
  }

  changeKyThi($event: any) {
    this.getValue(this.sortForm.value);
  }

  changePhongThi($event: any) {
    this.getValue(this.sortForm.value);
  }

  setValue(data: any) {
    this.sortForm.controls['DT_Id'].setValue(data.DT_Id);
    this.kythi.getByDotThi(this.sortForm.controls['DT_Id'].value).subscribe(
      (result) => {
        this.dsKyThi = result;
      }
    );
  }

  getValue(data: any) {
    this.danhsachphongthi.getDanhSachPhongThi(data).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dsHocVien = result;
      }
    );
  }

  export() {
    if (this.sortForm.controls['KT_Id'].value == '' || this.sortForm.controls['PH_Id'].value == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Chọn kỳ thi và phòng thi'
      });
    } else {
      this.dataExport = [];
      for (let i = 0; i < this.dsHocVien.length; i++) {
        this.dataExport.push({
          'STT': i + 1,
          'Mã HV': this.dsHocVien[i].HV_Id,
          'Họ Tên': this.dsHocVien[i].HV_HoTen,
          'Ngày Sinh': moment(this.dsHocVien[i].HV_NgaySinh).format('DD-MM-YYYY'),
          'Nơi Sinh': this.dsHocVien[i].HV_NoiSinh,
          'CMND/CCCD': this.dsHocVien[i].HV_Cmnd
        });
      }
      let filename = prompt("Nhập tên file", "");
      if (filename != '' && filename != null) {
        this.exportExcel.exportExcel(this.dataExport, `${filename}`);
      } else {
        if (filename == '') {
          alert('Vui lòng nhập tên file');
        }
      }
    }
  }

  loadfile() {
    if (this.sortForm.controls['KT_Id'].value == '' || this.sortForm.controls['PH_Id'].value == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Chọn kỳ thi và phòng thi'
      });
    } else {
      let input = document.getElementById('inputFile');

      input?.click();
    }
  }

  onFileChange($event: any) {
    let workBook: any = null;
    let jsonData: any = null;
    const reader = new FileReader();
    const file = $event.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataExcel = jsonData.data;
      this.importData(this.dataExcel);
    }
    reader.readAsBinaryString(file);
  }

  async importData(data: any) {
    const saveData: any = [];
    data.forEach(
      (element: any) => {
        let found = this.dsHocVien.filter((ele: any) => ele.HV_Id == element['Mã HV']);
        if (found.length > 0) {
          saveData.push({
            HV_Id: element['Mã HV'],
            KQ_LyThuyet: element['LyThuyet'],
            KQ_ThucHanh: element['ThucHanh']
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `Sai dữ liệu ${element}`
          });
          this.checkImport = false;
        }
      }
    );
    if (this.checkImport == true) {
      let postData = {
        KT_Id: this.sortForm.controls['KT_Id'].value,
        dsHocVien: saveData
      }

      Swal.fire({
        icon: 'question',
        title: 'Nhập điểm?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Nhập'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.ketquathi.addMulti(postData).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Nhập thành công'
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

  addPoint(hvId: any, kt: any) {
    this.dialog.open(
      PointFormComponent,
      {
        data: {
          title: 'Nhập điểm',
          hvId: hvId,
          ktId: kt
        }, autoFocus: false, restoreFocus: false
      }
    );
  }

  editPoint(hvId: any, kt: any) {
    this.dialog.open(
      PointFormComponent,
      {
        data: {
          title: 'Sửa điểm',
          hvId: hvId,
          ktId: kt,
          isUpdate: true
        }, autoFocus: false, restoreFocus: false
      }
    );
  }

}
