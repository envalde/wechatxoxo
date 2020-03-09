import { Component, Input, OnInit } from '@angular/core';
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
  }

}
