import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HeThongService } from 'src/app/services/he-thong.service';
import Swal from 'sweetalert2';

export interface systemDialogData {
  title: string;
  name: string;
}

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private hethong: HeThongService
  ) { }

  validationMessages: any = {
    Ten: {
      required: 'Nhập tên trung tâm'
    },
    Email: {
      required: 'Nhập email'
    },
    Password: {
      required: 'Nhập mật khẩu email'
    },
    DefaultPassword: {
      required: 'Nhập mật khẩu mặt định',
      maxLength: 'Mật khẩu không dài quá 30 ký tự',
      pattern: 'Mật khẩu phải hơn 8 ký tự bao gồm chữ thường, in hoa, số, ký tự đặc biệt'
    },
    Sdt: {
      required: 'Nhập số điện thoại'
    },
    DiaChi: {
      required: 'Nhập địa chỉ'
    },
    LinkFB: {
      required: 'Nhập liên kết'
    }
  };

  hide = true;
  hide1 = true;
  logoSrc: any;
  posterSrc: any;

  formErrors: any = {};

  systemForm!: FormGroup;

  ngOnInit(): void {
    this.systemForm = this.fb.group({
      Ten: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      DefaultPassword: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      Sdt: ['', Validators.required],
      DiaChi: ['', Validators.required],
      LinkFB: ['', Validators.required],
      Logo: [''],
      Poster: ['']
    });

    this.hethong.getConfig().subscribe(
      (result) => {
        this.setValueForm(result);
        this.logoSrc = this.hethong.getImage(result.Logo);
        this.posterSrc = this.hethong.getImage(result.Poster);
      }
    );

    this.systemForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.systemForm);
    });

  }

  setValueForm(data: any) {
    this.systemForm.controls['Ten'].setValue(data.Ten);
    this.systemForm.controls['Email'].setValue(data.Email);
    this.systemForm.controls['Password'].setValue(data.Password);
    this.systemForm.controls['DefaultPassword'].setValue(data.DefaultPassword);
    this.systemForm.controls['Sdt'].setValue(data.Sdt);
    this.systemForm.controls['DiaChi'].setValue(data.DiaChi);
    this.systemForm.controls['LinkFB'].setValue(data.LinkFB);
  }

  logValidationErrors(group: FormGroup = this.systemForm): void {
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

    console.log(this.systemForm.value);
    if (this.systemForm.valid) {
      Swal.fire({
        title: 'Lưu thay đổi?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lưu'
      }).then(
        (resutl) => {
          if (resutl.isConfirmed) {
            this.hethong.updateSystem(this.systemForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Thay đổi thông tin'
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
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Nhập đầy đủ thông tin'
      });
    }
  }

  changeLogo($event: any) {
    var file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.logoSrc = ('data:image/png;base64,' + btoa(reader.result as string));
        this.systemForm.controls['Logo'].setValue(this.logoSrc);
      };
      reader.readAsBinaryString(file);
    }
  }

  changePoster($event: any) {
    var file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.posterSrc = ('data:image/png;base64,' + btoa(reader.result as string));
        this.systemForm.controls['Poster'].setValue(this.posterSrc);
      };
      reader.readAsBinaryString(file);
    }
  }

  onCancel() {
    window.location.reload()
  }

}
