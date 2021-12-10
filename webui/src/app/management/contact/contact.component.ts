import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LienHeService } from 'src/app/services/lien-he.service';
import { ReplyContactComponent } from '../form/reply-contact/reply-contact.component';

export interface emailDialogData {
  title: string;
  subject: string;
  email: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private lienhe: LienHeService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['stt', 'hoten', 'sdt', 'email', 'noidung', 'ngaygui', 'status', '#'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.lienhe.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  replyClick(email: any) {
    this.dialog.open(
      ReplyContactComponent,
      {
        data: { title: 'Gửi email trả lời', subject: 'TRẢ LỜI THÔNG TIN LIÊN HỆ', email: email },
        autoFocus: false, restoreFocus: false
      }
    ).afterClosed().subscribe(
      () => {
        window.location.reload();
      }
    );
  }

}
