import { Component, OnInit } from '@angular/core';
import { HeThongService } from 'src/app/services/he-thong.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private hethong: HeThongService
  ) { }

  posterSrc: any;

  public isLogin = false;
  public data: any;

  ngOnInit(): void {
    this.hethong.getInfo().subscribe(
      (result) => {
        this.posterSrc = this.hethong.getImage(result.Poster);
      }
    );
  }


}
