import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent {

  constructor(
    public httpClient: HttpClient
  ) { }

  vote() {
    this.httpClient.post('http://localhost:5000/vote', {}).subscribe(x => {
      console.log('vote')
    })
  }

}
