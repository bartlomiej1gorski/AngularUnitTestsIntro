import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnChanges, AfterContentChecked, AfterContentInit, AfterViewInit, AfterViewChecked, DoCheck, OnDestroy {
  @Input() show: boolean = false;

  constructor() { }

  ngOnChanges() {
    // you need to call this method manually in spec.ts file
    this.show = true;
    console.log('ngOnChanges')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

}
