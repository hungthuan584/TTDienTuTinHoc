import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LienHeService } from 'src/app/services/lien-he.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private lienhe: LienHeService
  ) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['stt', 'hoten', 'sdt', 'email', 'noidung', 'ngaygui', '#'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.lienhe.getAll().subscribe(
      (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
