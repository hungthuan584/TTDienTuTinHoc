import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { DangKyThiService } from 'src/app/services/dang-ky-thi.service';
import { HoaDonService } from 'src/app/services/hoa-don.service';
import { HocVienService } from 'src/app/services/hoc-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { StudentDialogData } from '../../student/student.component';
import { SelectionModuleComponent } from './selection-module/selection-module.component';

export interface moduleDialogData {
  dsModule: any;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDialogData,
    public dialog: MatDialog,
    private dangkythi: DangKyThiService,
    private fb: FormBuilder,
    private chungchi: ChungChiService,
    private hoadon: HoaDonService,
    private tokenStorage: TokenStorageService,
    private hocvien: HocVienService
  ) { }

  loginAccount = this.tokenStorage.getUser();

  options = ["An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Kạn", "Bắc Giang", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Cần Thơ", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Đồng Nai", "Đồng Tháp", "Điện Biên", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hòa Bình", "Hậu Giang", "Hưng Yên", "Thành phố Hồ Chí Minh", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lào Cai", "Lạng Sơn", "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên - Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"];
  filteredOptions: any;

  validationMessages: any = {
    CC_Id: {
      required: 'Chọn chứng chỉ thi'
    },
    DKT_Module: {
      required: 'Chọn module dự thi'
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

  registerForm!: FormGroup;
  formErrors: any = {};
  dsChungChi: any;
  show = false;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      CC_Id: ['', Validators.required],
      DKT_Module: ['', Validators.required],
      HV_HoTen: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      HV_GioiTinh: ['', Validators.required],
      HV_NgaySinh: ['1999-06-19', Validators.required],
      HV_NoiSinh: ['Cần Thơ', Validators.required],
      HV_Cmnd: ['335689798', Validators.required],
      HV_NgayCapCmnd: ['2014-12-01', Validators.required],
      HV_NoiCapCmnd: ['Cần Thơ', Validators.required],
      HV_DanToc: ['Kinh', Validators.required],
      HV_QuocTich: ['Việt Nam', Validators.required],
      HV_Sdt: ['0987654321', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      HV_Email: ['abcd@gmail.com', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(200)]],
      HV_Mssv: [''],
      NV_Id: ['']
    });

    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

    this.registerForm.controls['NV_Id'].setValue(this.loginAccount.TK_TenDangNhap);

    this.registerForm.get('HV_NoiSinh')?.valueChanges.pipe(debounceTime(50)).subscribe(
      (res) => {
        if (res && res.length) {
          this.filterData(res);
        } else {
          this.filteredOptions = [];
        }
      }
    );

    if (this.data.dangKyThi) {
      this.hocvien.getById(this.data.id).subscribe(
        (result) => {
          this.setValueForm(result);
        }
      );
    }

    this.registerForm.valueChanges.subscribe(
      () => {
        this.logValidationErrors(this.registerForm);
      }
    );


  }

  setValueForm(data: any) {
    this.registerForm.controls['HV_HoTen'].setValue(data.HV_HoTen);
    this.registerForm.controls['HV_GioiTinh'].setValue(data.HV_GioiTinh);
    this.registerForm.controls['HV_NgaySinh'].setValue(moment(data.HV_NgaySinh).format('YYYY-MM-DD'));
    this.registerForm.controls['HV_NoiSinh'].setValue(data.HV_NoiSinh);
    this.registerForm.controls['HV_Cmnd'].setValue(data.HV_Cmnd);
    this.registerForm.controls['HV_NgayCapCmnd'].setValue(moment(data.HV_NgayCapCmnd).format('YYYY-MM-DD'));
    this.registerForm.controls['HV_NoiCapCmnd'].setValue(data.HV_NoiCapCmnd);
    this.registerForm.controls['HV_DanToc'].setValue(data.HV_DanToc);
    this.registerForm.controls['HV_QuocTich'].setValue(data.HV_QuocTich);
    this.registerForm.controls['HV_Sdt'].setValue(data.HV_Sdt);
    this.registerForm.controls['HV_Email'].setValue(data.HV_Email);
    this.registerForm.controls['HV_Mssv'].setValue(data.HV_Mssv);
  }

  fillEmail($event: any) {
    var name = $event.target.value;
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
    ];
    name = name.replace(/\s/g, '').toLowerCase();
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      name = name.replace(re, char);
    }

    this.registerForm.controls['HV_Email'].setValue(name + '@gmail.com');
  }

  onSelected($event: any) {
    if ($event.value === 'CNTTNC') {
      this.show = true;
      this.registerForm.controls['DKT_Module'].enable();
    } else {
      this.show = false;
      this.registerForm.controls['DKT_Module'].disable();
    }
  }

  selectModule() {
    this.dialog.open(
      SelectionModuleComponent,
      {
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      (result) => {
        console.log(result.data.dsModule.toString());
        var moduleValue = result.data.dsModule.toString();
        this.registerForm.controls['DKT_Module'].setValue(moduleValue);
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

  logValidationErrors(group: FormGroup = this.registerForm): void {
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

  onSubmit() {
    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Đăng ký thi?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng ký'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.dangkythi.addNew(this.registerForm.value).subscribe(
              (hocvien) => {
                if (hocvien.status == 1) {
                  this.hoadon.addExam(hocvien.username, this.registerForm.value).subscribe(
                    (hoadon) => {
                      if (hoadon.status == 1) {
                        Swal.fire({
                          icon: 'success',
                          title: 'Đăng ký thành công'
                        }).then(
                          () => {
                            this.dialogRef.close();
                          }
                        );
                      } else {
                        Swal.fire({
                          icon: 'error',
                          title: hoadon.message
                        });
                      }
                    }
                  );
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: hocvien.message
                  });
                }
              }
            );
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Nhập tất cả thông tin'
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
