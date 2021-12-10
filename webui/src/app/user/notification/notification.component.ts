import { Component, OnInit } from '@angular/core';
import { BaiVietService } from 'src/app/services/bai-viet.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private baiviet: BaiVietService
  ) { }

  dsBaiViet: any;

  ngOnInit(): void {
    this.baiviet.getNew().subscribe(
      (result) => {
        this.dsBaiViet = result;
      }
    );
  }

}
