import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChungChiService } from 'src/app/services/chung-chi.service';
import { DotThiService } from 'src/app/services/dot-thi.service';
import { KyThiService } from 'src/app/services/ky-thi.service';
import { RegisterFormComponent } from '../form/register-form/register-form.component';

export interface registerDialogData {
  title: string;
  id: any;
  dtId: any;
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private dotthi: DotThiService,
    private chungchi: ChungChiService,
    private kythi: KyThiService
  ) { }

  exam: any;
  dsChungChi: any;
  show = false;

  ngOnInit(): void {
    this.dotthi.getCurrent().subscribe(
      (result) => {
        console.log(result);
        if (result === null) {
          this.show = true;
        } else {
          this.exam = result;
        }
      }
    );

    this.chungchi.getAll().subscribe(
      (result) => {
        this.dsChungChi = result;
      }
    );

  }

  registerClick(ccId: any, dtId: any) {
    this.dialog.open(
      RegisterFormComponent,
      {
        data: {
          title: 'Đăng ký thi',
          id: ccId,
          dtId: dtId
        }, autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

}
