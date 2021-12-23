import { Component, OnInit } from '@angular/core';
import { HeThongService } from 'src/app/services/he-thong.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private hethong: HeThongService
  ) { }
  sys: any;

  ngOnInit(): void {
    this.hethong.getInfo().subscribe(
      (result) => {
        this.sys = result;
      }
    );
  }

}
