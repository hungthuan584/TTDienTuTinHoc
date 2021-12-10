import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaiVietService } from 'src/app/services/bai-viet.service';
import { NhanVienService } from 'src/app/services/nhan-vien.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { postDialogData } from '../../post/post.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: postDialogData,

    private token: TokenStorageService,
    private baiviet: BaiVietService,
    private fb: FormBuilder,
    private nhanvien: NhanVienService
  ) { }
  postForm!: FormGroup;
  loginAccount = this.token.getUser();
  user = this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe();
  validationMessages: any = {
    BV_TieuDe: {
      required: 'Nhập tiêu đề',
    },
    BV_MoTa: {
      required: 'Nhập mô tả',
    },
    BV_NoiDung: {
      required: 'Nhập nội dung'
    }
  };
  fileUrl: any;
  fileName: any;

  formErrors: any = {};
  ngOnInit(): void {
    this.nhanvien.getById(this.loginAccount.TK_TenDangNhap).subscribe(
      (result) => {
        if (this.data.id) {
          this.postForm.controls['BV_UpdateBy'].setValue(result.NV_HoTen);
          this.baiviet.getById(this.data.id).subscribe(
            (result) => {
              this.setValueForm(result);
            }
          );
        } else {
          this.postForm.controls['BV_CreateBy'].setValue(result.NV_HoTen);
        }
      }
    );

    this.postForm = this.fb.group({
      BV_TieuDe: ['', Validators.required],
      BV_MoTa: ['', Validators.required],
      BV_NoiDung: ['', Validators.required],
      BV_CreateBy: [''],
      BV_UpdateBy: ['']
    });

    this.postForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.postForm);
    });

  }

  setValueForm(data: any) {
    this.postForm.controls['BV_TieuDe'].setValue(data.BV_TieuDe);
    this.postForm.controls['BV_MoTa'].setValue(data.BV_MoTa);
    this.postForm.controls['BV_NoiDung'].setValue(data.BV_NoiDung);
  }

  logValidationErrors(group: FormGroup = this.postForm): void {
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
    if (this.postForm.valid) {
      if (this.data.id) {
        Swal.fire({
          title: 'Cập nhật bài viết?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cập nhật'
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.fileUrl) {
              var data = {
                formData: this.postForm.value,
                fileData: {
                  name: this.fileName,
                  base64: this.fileUrl
                }
              }
              this.baiviet.updateById(this.data.id, data).subscribe(
                (result) => {
                  if (result.status == 1) {
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
                      title: result.message
                    });
                  }
                }
              );
            } else {
              this.baiviet.updateById(this.data.id, this.postForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Cập nhật thành công',
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.dialogRef.close();
                      }
                    );
                  }
                }
              );
            }
          }
        });
      } else {
        Swal.fire({
          title: 'Đăng bài viết?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đăng'
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.fileUrl) {
              var data = {
                formData: this.postForm.value,
                fileData: {
                  name: this.fileName,
                  base64: this.fileUrl
                }
              }
              this.baiviet.addNew(data).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Đã đăng thành công'
                    }).then(
                      () => {
                        this.dialogRef.close();
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
            } else {
              this.baiviet.addNew(this.postForm.value).subscribe(
                (result) => {
                  if (result.status == 1) {
                    Swal.fire({
                      icon: 'success',
                      title: 'Đăng thành công',
                      showConfirmButton: true
                    }).then(
                      () => {
                        this.dialogRef.close();
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
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Nhập tất cả các trường'
      });
    }
  }

  onSelectFile($event: any) {
    var file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.fileName = file.name;
        this.fileUrl = ('data:application/pdf;base64,' + btoa(reader.result as string));
      };
      reader.readAsBinaryString(file);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
