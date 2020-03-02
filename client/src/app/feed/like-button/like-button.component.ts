import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {SocketService} from "../socket.service";
import {FeedPageComponent} from '../feed-page/feed-page.component';
import { post } from 'selenium-webdriver/http';



@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'], 
})
export class LikeButtonComponent implements OnInit,OnDestroy {



  @Input() likeId: String;
  
  constructor(private component: FeedPageComponent) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
   
  }
  
  plusLike(postId: number){
    this.component.plusLike(postId);
  }

  plusDislike(postId: number){
    this.component.plusDislike(postId);
      
  }
}


