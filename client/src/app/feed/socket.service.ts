import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import {Post} from "./feed.interfaces";
import {BehaviorSubject} from "rxjs";

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
  
  }

  public addPost(post: object) {
    this.socket.emit('post', JSON.stringify(post));
  }

  public close(): void {
    this.socket.close();
    this.posts$.complete();
  }
}
