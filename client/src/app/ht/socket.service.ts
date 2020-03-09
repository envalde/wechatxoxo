import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Post } from './ht.interfaces';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public hashtagPosts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private socket: SocketIOClient.Socket = io(environment.socketHost);

  constructor() {
   this.socket.on('hashtag', (rawPost: string) => {
     const posts = this.hashtagPosts$.getValue();
     posts.unshift(JSON.parse(rawPost));
     this.hashtagPosts$.next(posts);

   });

  
  }

  public hashtag(content: string){
    this.socket.emit('get_hashtag', content);
  }


   
}
