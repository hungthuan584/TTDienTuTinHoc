import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { HoaDonService } from 'src/app/services/hoa-don.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
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
      pattern: 'Số điện thoại không đúng'
    },
    HV_Email: {
      required: 'Nhập email',
      email: 'Email không đúng',
      maxlength: 'Email không được quá dài',
      minlength: 'Email không được quá ngắn'
    }
  }

  formErrors: any = {};

  constructor(
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDialogData,

    private fb: FormBuilder,
    private hocvien: HocVienService,
    private lophoc: LopHocService,
    private tokenStorage: TokenStorageService,
    private hoadon: HoaDonService
  ) { }

  loginAccount = this.tokenStorage.getUser();
  show = true;

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      LH_Id: ['', Validators.required],
      HV_HoTen: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      HV_GioiTinh: ['', Validators.required],
      HV_NgaySinh: ['1999-10-01', Validators.required],
      HV_NoiSinh: ['Cần Thơ', Validators.required],
      HV_Cmnd: ['338786537', Validators.required],
      HV_NgayCapCmnd: ['2015-12-15', Validators.required],
      HV_NoiCapCmnd: ['Cần Thơ', Validators.required],
      HV_DanToc: ['Kinh', Validators.required],
      HV_QuocTich: ['Việt Nam', Validators.required],
      HV_Sdt: ['0345678792', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      HV_Email: ['abc@gmail.com', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
      HV_Mssv: [''],
      NV_Id: ['']
    });

    this.studentForm.controls['NV_Id'].setValue(this.loginAccount.TK_TenDangNhap);

    this.studentForm.get('HV_NoiSinh')?.valueChanges.pipe(debounceTime(50)).subscribe(
      (res) => {
        if (res && res.length) {
          this.filterData(res);
        } else {
          this.filteredOptions = [];
        }
      }
    );

    this.lophoc.getOpening().subscribe(
      (result) => {
        this.dsLopHoc = result;
      }
    );

    if (this.data.isUpdate) {
      this.studentForm.controls['LH_Id'].disable();
      this.hocvien.getById(this.data.id).subscribe(
        (result) => {
          this.show = false;
          this.setValueForm(result);
        }
      );
    } else {
      this.show = true;
    }

    if (this.data.dangKyHoc) {
      this.hocvien.getById(this.data.id).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }

    this.studentForm.valueChanges.subscribe(
      () => {
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

  setValueForm(data: any) {
    this.studentForm.controls['HV_HoTen'].setValue(data.HV_HoTen);
    this.studentForm.controls['HV_GioiTinh'].setValue(data.HV_GioiTinh);
    this.studentForm.controls['HV_NgaySinh'].setValue(moment(data.HV_NgaySinh).format('YYYY-MM-DD'));
    this.studentForm.controls['HV_NoiSinh'].setValue(data.HV_NoiSinh);
    this.studentForm.controls['HV_Cmnd'].setValue(data.HV_Cmnd);
    this.studentForm.controls['HV_NgayCapCmnd'].setValue(moment(data.HV_NgayCapCmnd).format('YYYY-MM-DD'));
    this.studentForm.controls['HV_NoiCapCmnd'].setValue(data.HV_NoiCapCmnd);
    this.studentForm.controls['HV_DanToc'].setValue(data.HV_DanToc);
    this.studentForm.controls['HV_QuocTich'].setValue(data.HV_QuocTich);
    this.studentForm.controls['HV_Sdt'].setValue(data.HV_Sdt);
    this.studentForm.controls['HV_Email'].setValue(data.HV_Email);
    this.studentForm.controls['HV_Mssv'].setValue(data.HV_Mssv);
  }

  onCreate() {
    if (this.data.isUpdate) {
      if (this.studentForm.valid) {
        Swal.fire({
          title: 'Cập nhật thông tin?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.hocvien.updateById(this.data.id, this.studentForm.value).subscribe(
                (res) => {
                  if (res.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Cập nhật thành công',
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Lỗi!',
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.ngOnInit();
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    } else {
      if (this.studentForm.valid) {
        Swal.fire({
          title: 'Lưu thông tin?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lưu'
        }).then(
          (result) => {
            if (result.isConfirmed) {
              this.hocvien.addNew(this.studentForm.value).subscribe(
                (res) => {
                  if (res.status == 1) {
                    this.hoadon.addLearn(res.username, this.studentForm.value).subscribe(
                      (hoadon) => {
                        if (hoadon.status == 1) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Thêm thành công',
                            showConfirmButton: true
                          }).then(
                            () => {
                              this.dialogRef.close();
                            }
                          );
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: hoadon.message,
                            showConfirmButton: true
                          }).then(
                            () => {
                              this.ngOnInit();
                            }
                          );
                        }
                      }
                    );
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: res.message,
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.ngOnInit();
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
