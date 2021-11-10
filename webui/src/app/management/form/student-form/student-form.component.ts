import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { studentDialogData } from '../../student/student.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: studentDialogData,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  public formStudent = this.fb.group({
    HV_HoTen: ['', Validators.required],
    HV_Mssv: ['', [Validators.required, Validators.pattern("^[A-Z][0-9]{7}")]],
    HV_NgaySinh: ['', Validators.required],
    HV_NoiSinh: ['', Validators.required],
    HV_DanToc: ['', Validators.required],
    HV_QuocTich: ['', Validators.required],
    HV_GioiTinh: ['0', Validators.required],
    HV_Cmnd: ['', Validators.required],
    HV_NgayCapCmnd: ['', Validators.required],
    HV_NoiCapCmnd: ['', Validators.required],
    HV_Sdt: ['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
    HV_Email: ['', [Validators.required, Validators.email]]
  });

  onCreate() {

  }

  onUpdate() {

  }

  onCancel() {
    this.dialogRef.close();
  }

}
