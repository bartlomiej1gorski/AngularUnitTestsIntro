import { Component } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  votes: number = 0;

  constructor() { }

  increment() {
    this.votes++
  }

  decrement() {
    if (this.votes === 0) {
      return;
    }

    this.votes--;
  }
}
