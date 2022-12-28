import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IProduct } from './entities/IProduct'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'https://63ac0bfacf281dba8c3176e2.mockapi.io/api/product/'

  constructor(private httpService:HttpClient) { 
  }

  createPost(postData:IProduct){
      this.httpService.post(this.url, postData).subscribe(c => {
        console.log(c)
      })
  }

  getAllProduct(){
    return this.httpService.get<[]>(this.url)
  }

  deleteProduct(){
    return this.httpService.delete(this.url + 1)
  }
}
