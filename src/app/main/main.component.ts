import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IProduct } from '../entities/IProduct';
import { PostService } from '../post.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  products:IProduct[] = []

  constructor(private httpService:HttpClient, private postService:PostService){
    this.postService.getAllProduct().subscribe(data => {
      this.products = data
    })
  }
}
