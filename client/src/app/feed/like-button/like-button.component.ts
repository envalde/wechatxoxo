import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {SocketService} from "../socket.service";



@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit,OnDestroy {

  @Input() likeId: String;
  
  constructor(private socket: SocketService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
  
  plusLike(postId: number){
    console.log(postId);
    this.socket.plusLike(postId);
    
  }

}
