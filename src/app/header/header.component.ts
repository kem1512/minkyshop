import { Component, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { ICart } from '../entities/ICart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  @Input() carts:ICart[] = []

  @Input() totalMoney:number = 0

  @Output() removeCart = new EventEmitter<number>();

  @Output() searchingProduct = new EventEmitter<string>();

  Searching:boolean = false

  RemoveCart(id:number){
    this.removeCart.emit(id)
  }

  SearchingProduct(val:string){
    this.searchingProduct.emit(val)
  }

  ChangeSearch(){
    this.Searching = !this.Searching
  }
}
