import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Post} from "../feed.interfaces";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post: Post | null = null;
  

  constructor() {
  }

  ngOnInit() {
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
