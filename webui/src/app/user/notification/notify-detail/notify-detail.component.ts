import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BaiVietService } from 'src/app/services/bai-viet.service';

@Component({
  selector: 'app-notify-detail',
  templateUrl: './notify-detail.component.html',
  styleUrls: ['./notify-detail.component.scss']
})
export class NotifyDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private baiviet: BaiVietService
  ) { }
  id: any;
  post: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.id = paramMap.get('id');
      }
    );

    this.baiviet.getById(this.id).subscribe(
      (result) => {
        this.post = result;
      }
    );
  }

}
