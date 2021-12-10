import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendEmailService } from 'src/app/services/send-email.service';
import Swal from 'sweetalert2';
import { emailDialogData } from '../../contact/contact.component';

@Component({
  selector: 'app-reply-contact',
  templateUrl: './reply-contact.component.html',
  styleUrls: ['./reply-contact.component.scss']
})
export class ReplyContactComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReplyContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: emailDialogData,

    private email: SendEmailService,
    private fb: FormBuilder
  ) { }

  replyEmail!: FormGroup;
  validationMessages: any = {
    text: {
      required: 'Nhập nội dung email'
    }
  };

  formErrors: any = {};

  ngOnInit(): void {
    this.replyEmail = this.fb.group({
      subject: [''],
      text: ['', Validators.required]
    });

    this.replyEmail.controls['subject'].setValue(this.data.subject);

    this.replyEmail.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.replyEmail);
    });
  }

  logValidationErrors(group: FormGroup = this.replyEmail): void {
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
    if (this.replyEmail.valid) {
      Swal.fire({
        title: 'Gửi email?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Gửi'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Đang gửi ...',
              timer: 5000,
              timerProgressBar: true,
              showConfirmButton: false
            });
            this.email.replyContact(this.data.email, this.replyEmail.value).subscribe(
              (result) => {
                if (result.status == 1) {
                  Swal.fire({
                    title: 'Gửi thành công',
                    icon: 'success'
                  }).then(
                    () => {
                      this.dialogRef.close();
                    }
                  );
                } else {
                  Swal.fire({
                    title: 'Lỗi!',
                    icon: 'error'
                  });
                }
              }
            );
          }
        }
      );
    } else {
      Swal.fire({
        title: 'Nhập nội dung email',
        icon: 'warning'
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
