import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import Swal from 'sweetalert2';
import { ExamFormComponent } from '../form/exam-form/exam-form.component';
import { ExaminationFormComponent } from '../form/examination-form/examination-form.component';

export interface examDialogData {
  title: string;
  id: any;
  dtId: any;
  KT_Id: any;
  CC_Id: any;
  hvId: any;
  dsHocVien: any;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dotthi: DotThiService,
    private kythi: KyThiService,
    private chungChi: ChungChiService,
    private hocvien: HocVienService
  ) { }

  dsDotThi: any;
  dotThiSelected: any;
  dsKyThi: any;
  dsChungChi: any;
  kyThiSelected: any;
  total: any;
  studentForm!: FormGroup;
  dsHocVien = [];
  disable = true;

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      HV_Id: new FormArray([])
    });

    this.dotthi.getAll().subscribe(
      (result) => {
        this.dsDotThi = result;
        this.dotThiSelected = result[0].DT_Id;
        this.kythi.getByDotThi(this.dotThiSelected).subscribe(
          (result) => {
            this.dsKyThi = result;
          }
        );
      }
    );

    this.chungChi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

    this.kyThiSelected = '';
  }

  onChangeDotThi($event: any) {
    this.dotThiSelected = $event.value;
    this.kythi.getByDotThi(this.dotThiSelected).subscribe(
      (result) => {
        this.dsKyThi = result;
        this.kyThiSelected = '';
      }
    );
  }

  addDotThi() {
    this.dialog.open(
      ExamFormComponent,
      {
        data: { title: 'Mở đợt thi' },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  editDotThi(id: any) {
    this.dialog.open(
      ExamFormComponent,
      {
        data: { title: 'Sửa đợt thi', id: id },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  closeDotThi(id: any) {
    Swal.fire({
      title: 'Đóng đợt thi?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đóng'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dotthi.lockRegister(id).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đóng đợt thi'
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
  completeDotThi(id: any) {
    Swal.fire({
      title: 'Hoàn thành đợt thi?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hoàn thành'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.dotthi.completeById(id).subscribe(
            (result) => {
              if (result.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Hoàn thành đợt thi'
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

  addKyThi() {
    this.dialog.open(
      ExaminationFormComponent,
      {
        data: { title: 'Mở kỳ thi', dtId: this.dotThiSelected },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  editKyThi(id: any) {
    this.dialog.open(
      ExaminationFormComponent,
      {
        data: { title: 'Sửa thông tin kỳ thi', id: id },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }
}
