import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../feed.interfaces";
import {SocketService} from "../socket.service";
import {PostComponent} from '../post/post.component';



@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss'],
  providers: [SocketService]
})
export class FeedPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];

  public likes: number[] = [];
  public dislikes: number[] = [];

  
  
  constructor(private socket: SocketService) {
  }

  ngOnInit(): void {
    this.socket.posts$.subscribe(posts => this.posts = posts);

  }
  plusLike(postId: number){

    //this.socket.plusLike(postId);
    if (!this.likes.includes(postId)){
      console.log('Post noch nicht geliked von Benutzer');
      this.socket.plusLike(postId);
      this.likes.push(postId);
      console.log(this.likes);
    }else{
      console.log('Post wurde schon geliked');
    }
  }

  plusDislike(postId: number){

    //this.socket.plusDislike(postId);
    if (!this.dislikes.includes(postId)){
      console.log('Post noch nicht geldisiked von Benutzer');
      this.socket.plusDislike(postId);
      this.dislikes.push(postId);
      console.log(this.dislikes);
    }else{
      console.log('Post wurde schon gedisliked');
    }
      
  }

  ngOnDestroy(): void {
   
  }

  addPost(content: string) {
    let likeCount = 0;
    let dislikeCount = 0;
    let id = 1;
    this.socket.addPost({ content, likeCount, dislikeCount, id});
  }
  
}
