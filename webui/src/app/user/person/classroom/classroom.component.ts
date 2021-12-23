import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DangKyHocService } from 'src/app/services/dang-ky-hoc.service';
import { LopDaoTaoService } from 'src/app/services/lop-dao-tao.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private lophoc: LopHocService,
    private thongbao: ThongBaoService
  ) { }

  lophocInfo: any;
  dsThongBao: any;
  lhId: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params:ParamMap) => {
          this.lhId = params.get('LH_Id');
      }
    );

    this.lophoc.getById(this.lhId).subscribe(
      (result) => {
        this.lophocInfo = result;
        console.log(result);
      }
    );
    this.thongbao.getByLopHoc(this.lhId).subscribe(
      (result) => {
        this.dsThongBao = result;
      }
    );
  }

}
