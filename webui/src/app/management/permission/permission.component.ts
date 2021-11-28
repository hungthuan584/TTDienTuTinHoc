import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChucNangService } from 'src/app/services/chuc-nang.service';
import { PhanQuyenService } from 'src/app/services/phan-quyen.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';
import { employeeDialogData } from '../employee/employee.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  functionForm!: FormGroup;
  listChecked: any = [];
  listFunction: any;
  listPermission: any;
  constructor(
    public dialogRef: MatDialogRef<PermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: employeeDialogData,

    private chucnang: ChucNangService,
    private phanquyen: PhanQuyenService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.functionForm = this.fb.group({
      CN_Id: new FormArray([])
    });

    this.phanquyen.getByUsername(this.data.id).subscribe(
      result => {
        this.listPermission = result;
      }
    );

    this.chucnang.getAll().subscribe(
      (result) => {
        this.listFunction = result;
      }
    );

  }

  checkPermission(chucnang: any) {
    for (let per of this.listPermission) {
      if (per.CN_Id == chucnang) {
        return true;
      }
    }
    return false;
  }


  onChangeChecked($event: any) {
    const fn: FormArray = this.functionForm.get('CN_Id') as FormArray;
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
          TK_TenDangNhap: this.data.id,
          CN_Id: fn.value[i]
        }
      );
    }

    this.listChecked = checked;
  }

  onSubmit() {
    if (this.listChecked.length == 0) {
      this.dialogRef.close();
    } else {
      Swal.fire({
        icon: 'question',
        title: 'Cấp quyền mục đã chọn',
        showCancelButton: true,
        confirmButtonText: 'Cấp quyền',
        confirmButtonColor: '#0984e3',
        cancelButtonColor: '#485460'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.phanquyen.addNew(this.listChecked).subscribe(
              (res) => {
                if (res.status == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Đã phân quyền',
                    showConfirmButton: true
                  }).then(
                    () => {
                      this.ngOnInit();
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
  }

  onDelete(id: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Thu hồi?',
      showCancelButton: true,
      confirmButtonText: 'Thu hồi',
      confirmButtonColor: '#d63031',
      cancelButtonColor: '#485460'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.phanquyen.deleteByUsername(this.data.id, id).subscribe(
            (res) => {
              if (res.status == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Đã thu hồi quyền',
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

  onCancel() {
    this.dialogRef.close();
  }

}
