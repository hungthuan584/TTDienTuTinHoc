import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { ThoiGianHocService } from 'src/app/services/thoi-gian-hoc.service';
import { ThongKeService } from 'src/app/services/thong-ke.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-by-teacher',
  templateUrl: './by-teacher.component.html',
  styleUrls: ['./by-teacher.component.scss']
})
export class ByTeacherComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private chungchi: ChungChiService,
    private thoigian: ThoiGianHocService,
    private thongke: ThongKeService,
    private exportExcel: ExportExcelService
  ) { }

  displayedColumns: string[] = ['stt', 'id', 'hoten', 'sdt', 'email', 'trinhdo', 'lophoc', 'ngayhoc', 'khaigiang'];
  dataSource!: MatTableDataSource<any>;

  searchForm!: FormGroup;
  dsChungChi: any;
  dsThoiGian: any;
  exportData: any[] = [];
  saveData: any;


  dsTrinhDo = [
    {
      id: 'KS',
      ten: 'Kỹ sư'
    },
    {
      id: 'ThS',
      ten: 'Thạc sĩ'
    },
    {
      id: 'TS',
      ten: 'Tiến sĩ'
    },
    {
      id: 'PGS',
      ten: 'Phó Giáo sư'
    },
    {
      id: 'GS',
      ten: 'Giáo sư'
    }
  ];

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      FromDay: [''],
      ToDay: [''],
      CC_Id: [''],
      TG_Id: [''],
      TrinhDo: ['']
    });

    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );
    this.thoigian.getAll().subscribe(
      (result) => {
        this.dsThoiGian = result;
      }
    );

    this.thongke.getByGiaoVien(this.searchForm.value).subscribe(
      (result) => {
        console.log(result);
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
      let lophoc = '';
      let khaigiang = '';
      let thoigian = '';

      if (!this.saveData[i].LH_Id) {
        lophoc = 'Chưa phân công';
        thoigian = 'None';
        khaigiang = 'None';
      } else {
        lophoc = `${this.saveData[i].LH_Id} - ${this.saveData[i].LDT_Ten}`;
        thoigian = this.saveData[i].TG_Ten;
        khaigiang = moment(this.saveData[i].LH_NgayKhaiGiang).format('DD-MM-YYYY');
      }

      this.exportData.push({
        'Mã giáo viên': this.saveData[i].GV_Id,
        'Họ tên': this.saveData[i].GV_HoTen,
        'Số điện thoại': this.saveData[i].GV_Sdt,
        'Email': this.saveData[i].GV_Email,
        'Trình độ chuyên môn': this.saveData[i].GV_TrinhDo,
        'Lớp giảng dạy': lophoc,
        'Thời gian': thoigian,
        'Ngày khai giảng': khaigiang
      });
    }
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

  onSubmit() {
    this.thongke.getByGiaoVien(this.searchForm.value).subscribe(
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
    this.thongke.getByGiaoVien(this.searchForm.value).subscribe(
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
