import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KetQuaThiService } from 'src/app/services/ket-qua-thi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private ketquathi: KetQuaThiService
  ) { }

  searchForm!: FormGroup;
  ketQua: any;
  validationMessages: any = {
    HV_Id: {
      required: 'Nhập mã học viên'
    },
    KT_Id: {
      required: 'Nhập mã kỳ thi'
    },
    KT_NgayThi: {
      required: 'Nhập ngày thi'
    }
  }

  formErrors: any = {};

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      HV_Id: ['210020', Validators.required],
      KT_Id: ['CNTTCB1', Validators.required],
      KT_NgayThi: ['2021-11-06', Validators.required]
    });

    this.searchForm.valueChanges.subscribe(
      () => {
        this.logValidationErrors(this.searchForm);
      }
    );
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.ketquathi.getByStudent(this.searchForm.value).subscribe(
        (result) => {
          this.ketQua = result;
          console.log(result);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Nhập tất cả các trường'
      });
    }
  }

  reset() {
    this.ngOnInit();
  }

  logValidationErrors(group: FormGroup = this.searchForm): void {
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
