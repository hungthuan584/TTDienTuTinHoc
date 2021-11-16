import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { StudentDialogData } from '../../student/student.component';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  studentForm!: FormGroup;
  dsLopHoc: any;

  options = ["An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Kạn", "Bắc Giang", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Cần Thơ", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Đồng Nai", "Đồng Tháp", "Điện Biên", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hòa Bình", "Hậu Giang", "Hưng Yên", "Thành phố Hồ Chí Minh", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lào Cai", "Lạng Sơn", "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên - Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"];
  filteredOptions: any;

  validationMessages: any = {
    LH_Id: {
      required: 'Chọn lớp học'
    },
    HV_HoTen: {
      required: 'Nhập họ tên học viên',
      maxlength: 'Họ tên quá dài',
      minlength: 'Họ tên quá ngắn'
    },
    HV_GioiTinh: {
      required: 'Chọn giới tính',
    },
    HV_NgaySinh: {
      required: 'Chọn ngày sinh',
    },
    HV_NoiSinh: {
      required: 'Nhập nơi sinh',
    },
    HV_Cmnd: {
      required: 'Nhập CMND/CCCD',
    },
    HV_NgayCapCmnd: {
      required: 'Chọn ngày cấp CMND/CCCD',
    },
    HV_NoiCapCmnd: {
      required: 'Nhập nơi cấp CMND/CCCD',
    },
    HV_DanToc: {
      required: 'Nhập dân tộc',
    },
    HV_QuocTich: {
      required: 'Nhập quốc tịch',
    },
    HV_Sdt: {
      required: 'Nhập số điện thoại',
      partern: 'Số điện thoại không đúng'
    },
    HV_Email: {
      required: 'Nhập email',
      email: 'Email không đúng'
    }
  }

  formErrors: any = {};

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDialogData,
    private fb: FormBuilder,
    private hocvien: HocVienService,
    private lophoc: LopHocService,
    private dangky: DangKyHocService
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      LH_Id: ['', Validators.required],
      HV_HoTen: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      HV_GioiTinh: ['', Validators.required],
      HV_NgaySinh: ['', Validators.required],
      HV_NoiSinh: ['', Validators.required],
      HV_Cmnd: ['', Validators.required],
      HV_NgayCapCmnd: ['', Validators.required],
      HV_NoiCapCmnd: ['', Validators.required],
      HV_DanToc: ['', Validators.required],
      HV_QuocTich: ['', Validators.required],
      HV_Sdt: ['', Validators.required],
      HV_Email: ['', Validators.required],
      HV_Mssv: ['']
    });

    this.studentForm.get('HV_NoiSinh')?.valueChanges.pipe(debounceTime(100)).subscribe(
      (res) => {
        if (res && res.length) {
          this.filterData(res);
        } else {
          this.filteredOptions = [];
        }
      }
    );
    this.lophoc.getAll().subscribe(
      (result) => {
        this.dsLopHoc = result;
      }
    );

    if (this.data.id) {
      this.hocvien.getById(this.data.id).subscribe(
        (result) => {
          
        }
      )
    }

    this.studentForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.studentForm);
      }
    );
  }

  filterData(data: any) {
    this.filteredOptions = this.options.filter(
      (item) => {
        return item.toLowerCase().indexOf(data.toLowerCase()) > -1;
      }
    );
  }

  logValidationErrors(group: FormGroup = this.studentForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')
      ) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onCreate() {
    if (this.data.id) {
      if (this.studentForm.valid) {
        console.log('Data: ', this.studentForm.value);
      }
    } else {
      if (this.studentForm.valid) {
        console.log('Data: ', this.studentForm.value);
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
