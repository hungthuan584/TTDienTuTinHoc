import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { DangKyThiService } from 'src/app/services/dang-ky-thi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import Swal from 'sweetalert2';
import { StudentInfoComponent } from '../student-info/student-info.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private dangkyhoc: DangKyHocService,
    private dangkythi: DangKyThiService,
    private dotthi: DotThiService,
    private fb: FormBuilder
  ) { }


  show = false;
  displayedColumns: string[] = ['check', 'stt', 'HV_Id', 'HV_HoTen', 'HV_GioiTinh', 'HV_NoiSinh', 'HV_NgaySinh', 'HV_Sdt', 'HV_Email', 'status', '#'];
  dataSource!: MatTableDataSource<any>;
  lhId: any;
  dsHocVien: any = [];
  exam: any;
  checkForm!: FormGroup;
  listCheck: any = [];

  ngOnInit(): void {
    this.checkForm = this.fb.group({
      HV_Id: new FormArray([])
    });

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.lhId = params.get('lhId');
      }
    );

    this.dotthi.getCurrent().subscribe(
      (result) => {
        this.setValue(result);
      }
    );

    this.dangkyhoc.getByLopHoc(this.lhId).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dsHocVien = result;
      }
    );
  }

  onChange($event: any) {
    const st: FormArray = this.checkForm.get('HV_Id') as FormArray;

    if ($event.target.checked) {
      const index = st.controls.findIndex(x => x.value === $event.target.value);
      if (index < 0) {
        st.push(new FormControl($event.target.value));
      }
    } else {
      const index = st.controls.findIndex(x => x.value === $event.target.value);
      st.removeAt(index);
    }
    this.listCheck = st.value;
  }

  setValue(dt: any) {
    this.exam = dt;
  }

  showInfo(hvId: any) {
    this.dialog.open(
      StudentInfoComponent,
      {
        data: { title: 'Thông tin học viên', id: hvId, lhId: this.lhId },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  checkAll() {
    Swal.fire({
      title: 'Duyệt tất cả?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          let i = 0;
          let data = [];
          for (i; i < this.dsHocVien.length; i++) {
            if (this.lhId.slice(2, 4) == 'NC') {
              data.push({ HV_Id: this.dsHocVien[i].HV_Id, DT_Id: this.exam.DT_Id, CC_Id: `CNTT${this.lhId.slice(2, 4)}`, DKT_Module: 'IU&,IU8,IU9', DKT_IsConfirm: 1 });
            } else {
              data.push({ HV_Id: this.dsHocVien[i].HV_Id, DT_Id: this.exam.DT_Id, CC_Id: `CNTT${this.lhId.slice(2, 4)}`, DKT_Module: '', DKT_IsConfirm: 1 });
            }
          }
          this.dangkythi.addMultiple(data).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Duyệt thành công'
                }).then(
                  () => {
                    window.location.reload();
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

  checkSelect() {
    Swal.fire({
      title: 'Duyệt học viên được chọn?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          let i = 0;
          let data = [];
          for (i; i < this.listCheck.length; i++) {
            if (this.lhId.slice(2, 4) == 'NC') {
              data.push({ HV_Id: this.listCheck[i], DT_Id: this.exam.DT_Id, CC_Id: `CNTT${this.lhId.slice(2, 4)}`, DKT_Module: 'IU&,IU8,IU9', DKT_IsConfirm: 1 });
            } else {
              data.push({ HV_Id: this.listCheck[i], DT_Id: this.exam.DT_Id, CC_Id: `CNTT${this.lhId.slice(2, 4)}`, DKT_Module: '', DKT_IsConfirm: 1 });
            }
          }
          this.dangkythi.addMultiple(data).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Duyệt thành công'
                }).then(
                  () => {
                    window.location.reload();
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
