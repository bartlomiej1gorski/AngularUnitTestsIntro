import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { VoteComponent } from './vote/vote.component';
import { VoteButtonComponent } from './vote/vote-button/vote-button.component';


@NgModule({
  declarations: [
    VoteComponent,
    VoteButtonComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
