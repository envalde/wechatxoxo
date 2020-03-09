import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post} from '../ht.interfaces';
import { SocketService} from '../socket.service';
import { HtPostComponent} from '../ht-post/ht-post.component';

@Component({
  selector: 'app-ht-page',
  templateUrl: './ht-page.component.html',
  styleUrls: ['./ht-page.component.scss'],
  providers: [SocketService]
})

export class HtPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];

  constructor( private socket: SocketService) { }

  ngOnInit(): void  {
    this.socket.hashtagPosts$.subscribe(posts => this.posts = posts);
  }

  ngOnDestroy(){

  }

  search_ht( content: string){
    this.socket.hashtag(content);
  }

}
