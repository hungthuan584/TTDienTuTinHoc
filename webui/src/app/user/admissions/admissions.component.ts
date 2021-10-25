import { Component, OnInit } from '@angular/core';
import { LopDaoTaoService } from 'src/app/services/lop-dao-tao.service';
import { LopHocService } from 'src/app/services/lop-hoc.service';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements OnInit {


  listLopHoc: any = [];
  listLopDaoTao: any =[];

  constructor(
    private lopdaotaoService: LopDaoTaoService,
    private lophocService: LopHocService

  ) { }

  ngOnInit(): void {
    this.lophocService.getAllLopHoc().subscribe(
      (result) => {
        console.log(result);
        this.listLopHoc = result;
        console.log('Lop Hoc: ', this.listLopHoc);
      }
    );

    this.lopdaotaoService.getAllLLopDaoTao().subscribe(
      (dsLopDaoTao: any) => this.listLopDaoTao = dsLopDaoTao,
      (err: any) => console.log(err)
    );
  }

  onClickDangKy(LH_Id: string) {

  }



}
