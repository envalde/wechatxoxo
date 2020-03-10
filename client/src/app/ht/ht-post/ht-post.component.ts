import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Post } from '../ht.interfaces';

@Component({
  selector: 'app-ht-post',
  templateUrl: './ht-post.component.html',
  styleUrls: ['./ht-post.component.scss']
})
export class HtPostComponent implements OnInit {
  @Input() public post: Post | null = null;

  constructor() { }

  ngOnInit(): void {
    this.setLinks();
  }
  ngAfterViewInit(){
    this.setLinks();
  }
  public setLinks(){
    var text = document.querySelectorAll(".card-body")
    
    text.forEach(element => {
      element.innerHTML = element.innerHTML.replace(/#(\w+)/g, '<a href="/hashtag?content=$1">#$1</a>');
    });
  }


}
