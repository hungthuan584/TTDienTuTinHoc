import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { PersonPanelComponent } from './person-panel/person-panel.component';
import { InfomationComponent } from './infomation/infomation.component';





@NgModule({
  declarations: [
    PersonComponent,
    PersonPanelComponent,
    InfomationComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule

  ]
})
export class PersonModule { }
