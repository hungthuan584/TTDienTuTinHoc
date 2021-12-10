import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { dialogData } from '../classroom/classroom.component';
import { StudentInfoComponent } from '../student-info/student-info.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ListStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData,
    public dialog: MatDialog,
    private dangkyhoc: DangKyHocService,
    private fb: FormBuilder
  ) { }


  show = false;
  displayedColumns: string[] = ['stt', 'HV_Id', 'HV_HoTen', 'HV_GioiTinh', 'HV_Sdt', 'HV_Email', '#'];
  dataSource!: MatTableDataSource<any>;
  dsHocVienVang: any;
  checkForm!: FormGroup;

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.checkForm = this.fb.group({
      HV_Id: new FormArray([])
    });

    this.dangkyhoc.getByLopHoc(this.data.id).subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  onChange($event: any) {
    const fn: FormArray = this.checkForm.get('HV_Id') as FormArray;
    const checked: Object[] = [];

    if ($event.target.checked) {
      fn.push(new FormControl($event.target.value));
    } else {
      const index = fn.controls.findIndex(x => x.value === $event.target.value);
      fn.removeAt(index);
    }

    for (var i = 0; i < fn.value.length; i++) {
      checked.push(
        {
          HV_Id: fn.value[i]
        }
      );
    }

    if (fn.length != 0) {
      this.show = true;
    } else {
      this.show = false;
    }

    this.dsHocVienVang = checked;
  }

  showInfo(hvId: any) {
    this.dialog.open(
      StudentInfoComponent,
      {
        data: { title: 'Thông tin học viên', id: hvId, lhId: this.data.lhId },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  onSubmit() {
    console.log(this.dsHocVienVang);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
