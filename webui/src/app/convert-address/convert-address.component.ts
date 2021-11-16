import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-convert-address',
  templateUrl: './convert-address.component.html',
  styleUrls: ['./convert-address.component.scss']
})
export class ConvertAddressComponent implements OnInit {

  addressForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clipboard: ClipboardService
  ) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      input: [''],
      output: ['']
    });
  }

  onChange($event: any) {
    var input = $event.target.value;
    var req1 = /Phường/gi;
    var req2 = /Quận/gi;
    var req3 = /Thành phố/gi;

    var result = input.replace(req1, "P.").replace(req2, "Q.").replace(req3, "TP");
    this.addressForm.controls['output'].setValue(result);
  }

  copyText() {
    this.clipboard.copy(this.addressForm.controls['output'].value);
    Swal.fire(
      {
        icon: 'success',
        timer: 1000,
        title: 'Copied',
        showConfirmButton: false
      }
    );
  }

}
