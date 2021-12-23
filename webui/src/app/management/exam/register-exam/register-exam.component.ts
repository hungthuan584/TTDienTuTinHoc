import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DangKyThiService } from 'src/app/services/dang-ky-thi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-exam',
  templateUrl: './register-exam.component.html',
  styleUrls: ['./register-exam.component.scss']
})
export class RegisterExamComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dotthi: DotThiService,
    private dangkythi: DangKyThiService
  ) { }


  displayedColumns: string[] = ['#', 'id', 'hoten', 'gioitinh', 'sdt', 'email', 'ngaydangky', 'chungchi', 'module', 'hoadon', 'duyet'];
  dataSource!: MatTableDataSource<any>;

  studentForm!: FormGroup;
  dsDotThi: any;
  dotThiSelected = '';
  dsHocVien = [];

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      HV_Id: new FormArray([])
    });

    this.dotthi.getAll().subscribe(
      (result) => {
        this.dsDotThi = result;
        this.dotThiSelected = result[0].DT_Id;
        this.getByDotThi(this.dotThiSelected);
      }
    );

  }

  onChangeDotThi($event: any) {
    this.dotThiSelected = $event.value;
    this.getByDotThi(this.dotThiSelected);
  }

  getByDotThi(dtId: any) {
    this.dangkythi.getByDotThi(dtId).subscribe(
      (result) => {
        this.dataSource = result;
        console.log(this.dataSource);
      }
    );
  }

  onSelect($event: any) {
    const st: FormArray = this.studentForm.get('HV_Id') as FormArray;

    if ($event.target.checked) {
      const index = st.controls.findIndex(x => x.value === $event.target.value);
      if (index < 0) {
        st.push(new FormControl($event.target.value));
      }
    } else {
      const index = st.controls.findIndex(x => x.value === $event.target.value);
      st.removeAt(index);
    }
    this.dsHocVien = st.value;
  }

  submitAll() {
    Swal.fire({
      icon: 'question',
      title: 'Duyệt các mục được chọn',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dangkythi.confirmAuto(this.dsHocVien).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Duyệt thành công'
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

  submitOne(hvId: any) {
    Swal.fire({
      icon: 'question',
      title: 'Duyệt học viên?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dangkythi.confirmByHV(hvId).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Duyệt thành công'
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
    )
  }

}
