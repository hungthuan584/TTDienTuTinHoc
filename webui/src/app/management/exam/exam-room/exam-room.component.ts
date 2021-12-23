import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { DangKyThiService } from 'src/app/services/dang-ky-thi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import Swal from 'sweetalert2';
import { ArrangeExamRoomComponent } from '../../form/arrange-exam-room/arrange-exam-room.component';
import { ArrangeExamComponent } from '../../form/arrange-exam/arrange-exam.component';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.scss']
})
export class ExamRoomComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private dotthi: DotThiService,
    private dangkythi: DangKyThiService,
    private fb: FormBuilder,
    private chungchi: ChungChiService
  ) { }
  dsDotThi: any;
  dsChungChi: any;

  dsHocVien = [];
  dotThiSelected: any;

  displayedColumns: string[] = ['#', 'id', 'hoten', 'gioitinh', 'ngaysinh', 'noisinh', 'sdt', 'email', 'chungchi', 'module', 'action'];
  dataSource!: MatTableDataSource<any>;
  sortForm!: FormGroup;
  checkForm!: FormGroup;
  show = false;
  selectionList = [];

  ngOnInit(): void {
    this.checkForm = this.fb.group({
      HV_Id: new FormArray([])
    });

    this.sortForm = this.fb.group({
      DT_Id: [''],
      CC_Id: ['']
    });

    this.dotthi.getAll().subscribe(
      (result) => {
        this.dsDotThi = result;
        this.sortForm.controls['DT_Id'].setValue(result[0].DT_Id);
        this.dangkythi.getAllHocVienDuThi(this.sortForm.controls['DT_Id'].value).subscribe(
          (result) => {
            this.dataSource = new MatTableDataSource(result);
          }
        );
      }
    );

    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

  }

  onSelect($event: any) {
    const st: FormArray = this.checkForm.get('HV_Id') as FormArray;

    if ($event.target.checked) {
      const index = st.controls.findIndex(x => x.value === $event.target.value);
      if (index < 0) {
        st.push(new FormControl({ HV_Id: $event.target.value }));
      }
    } else {
      const index = st.controls.findIndex(x => x.value === $event.target.value);
      st.removeAt(index);
    }
    this.selectionList = st.value;
    console.log(this.selectionList);
  }

  changeDotThi($event: any) {
    this.dangkythi.getAllHocVienDuThi($event.value).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
      }
    );
  }

  changeChungChi($event: any) {
    this.show = true;
    this.dangkythi.getHocVienDuThiByCC(this.sortForm.controls['DT_Id'].value, $event.value).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.setValue(result);
      }
    );
  }

  arrangeOne(hvId: any, ccId: any) {
    this.dialog.open(
      ArrangeExamComponent,
      {
        data: {
          title: 'Xếp phòng thi',
          CC_Id: ccId,
          dtId: this.sortForm.controls['DT_Id'].value,
          hvId: hvId
        }, autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  onArrangeSelected() {
    this.dialog.open(
      ArrangeExamRoomComponent,
      {
        data: {
          title: 'Xếp phòng thi',
          CC_Id: this.sortForm.controls['CC_Id'].value,
          dtId: this.sortForm.controls['DT_Id'].value,
          dsHocVien: this.selectionList
        }, autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

  onArrange() {
    if (this.sortForm.controls['CC_Id'].value == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Chọn chứng chỉ'
      });
    } else {
      this.dialog.open(
        ArrangeExamRoomComponent,
        {
          data: {
            title: 'Xếp phòng thi',
            CC_Id: this.sortForm.controls['CC_Id'].value,
            dtId: this.sortForm.controls['DT_Id'].value,
            dsHocVien: this.dsHocVien
          }, autoFocus: false, restoreFocus: false
        }
      ).afterClosed().subscribe(
        () => {
          window.location.reload();
        }
      );
    }
  }

  setValue(data: any) {
    this.dsHocVien = data;
  }
}
