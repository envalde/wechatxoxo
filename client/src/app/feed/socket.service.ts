import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import {Post} from "./feed.interfaces";
import {BehaviorSubject} from "rxjs";
//import { post } from 'selenium-webdriver/http';

@Injectable()
export class SocketService {
  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private socket: SocketIOClient.Socket = io(environment.socketHost);

  constructor() {
    this.socket.on('post', (rawPost: string) => {
      const posts = this.posts$.getValue();
      posts.unshift(JSON.parse(rawPost));
      this.posts$.next(posts);
    });
    this.socket.on('all', (rawPosts: string) => {
      const posts:  Post[] = JSON.parse(rawPosts);
      this.posts$.next(posts.reverse());
    });
  }

  public addPost(post: object) {
    this.socket.emit('post', JSON.stringify(post));
  }

  public plusLike(id: number){
    this.socket.emit('plus like', id);
    console.log('like Daten werden gesendet ID: ' + id);
    
  }
  public plusDislike(id: number){
    this.socket.emit('plus dislike', id);
    console.log('Dislike Daten werden gesendet ID: ' + id);
  }

  public close(): void {
    this.socket.close();
    this.posts$.complete();
  }
}
