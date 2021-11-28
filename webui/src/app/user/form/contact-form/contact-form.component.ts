import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LienHeService } from 'src/app/services/lien-he.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private lienhe: LienHeService
  ) { }

  contactForm!: FormGroup;
  validationMessages: any = {
    CT_HoTen: {
      required: 'Nhập họ tên'
    },
    CT_Sdt: {
      required: 'Nhập số điện thoại',
      pattern: 'Số điện thoại không đúng'
    },
    CT_Email: {
      required: 'Nhập email',
      email: 'Email không đúng'
    },
    CT_NoiDung: {
      required: 'Nhập nội dung'
    }
  }

  formErrors: any = {};
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      CT_HoTen: ['', [Validators.required]],
      CT_Sdt: ['', [Validators.required, Validators.pattern('^[0][0-9]{9}')]],
      CT_Email: ['', [Validators.required, Validators.email]],
      CT_NoiDung: ['', Validators.required]
    });

    this.contactForm.valueChanges.subscribe(
      () => {
        this.logValidationErrors(this.contactForm);
      }
    );
  }

  onSubmit() {
    if (this.contactForm.valid) {
      Swal.fire({
        title: 'Gửi thông tin?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Gửi'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.lienhe.addNew(this.contactForm.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Gửi thông tin thành công',
                    text: 'Vui lòng chờ nhân viên của trung tâm liên hệ tư vấn'
                  }).then(
                    () => {
                      window.location.reload();
                    }
                  );
                }
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!'
            });
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Nhập đầy đủ các thông tin'
      });
    }
  }

  onReset() {
    window.location.reload();
  }

  logValidationErrors(group: FormGroup = this.contactForm): void {
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

}
