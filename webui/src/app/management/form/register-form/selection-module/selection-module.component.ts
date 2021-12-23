import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';
import Swal from 'sweetalert2';
import { moduleDialogData } from '../register-form.component';

@Component({
  selector: 'app-selection-module',
  templateUrl: './selection-module.component.html',
  styleUrls: ['./selection-module.component.scss']
})
export class SelectionModuleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectionModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: moduleDialogData,

    private module: ModuleService,
    private fb: FormBuilder
  ) { }
  dsModule: any;
  formModule!: FormGroup;
  selectedModule: any;

  ngOnInit(): void {
    this.formModule = this.fb.group({
      MD_Id: new FormArray([])
    });

    this.module.getAdvanced().subscribe(
      (result) => {
        this.dsModule = result;
      }
    );
  }

  onSelect($event: any) {
    const fn: FormArray = this.formModule.get('MD_Id') as FormArray;
    const checked: Object[] = [];

    if ($event.target.checked) {
      fn.push(new FormControl($event.target.value));
    } else {
      const index = fn.controls.findIndex(x => x.value === $event.target.value);
      fn.removeAt(index);
    }
    this.selectedModule = fn.value;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.selectedModule.length == 3) {
      Swal.fire({
        title: 'Chọn module?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chọn'
      }).then(
        (result) => {
          if (result.isConfirmed) {
            this.dialogRef.close(
              {
                data: { dsModule: this.selectedModule }
              }
            );
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Chọn 3 module để đăng ký dự thi'
      });
    }
  }

}
