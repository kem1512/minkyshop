import { Component } from '@angular/core';
import { ICart } from '../entities/ICart';
import { IProduct } from '../entities/IProduct';
import { PostService } from '../post.service'
import Swal from 'sweetalert2'
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  products: IProduct[] = []

  productsOld: IProduct[] = [] 

  carts: ICart[] = []

  totalMoney: number = 0

  constructor(private postService: PostService) {
    this.LoadData()
  }

  LoadData() {
    this.postService.getAllProduct().subscribe(data => {
      this.products = data
      this.productsOld = data
    })

    var cartFromSession = sessionStorage.getItem('myCart')
    if (cartFromSession != null) {
      this.carts = JSON.parse(cartFromSession)
    }

    if (this.carts.length > 0) {
      this.totalMoney = this.carts.reduce((accumulator, currentValue) => accumulator + (currentValue.product.price * currentValue.quantity), 0)
    }
  }

  IsExist(id: number) {
    if (this.carts != null) {
      for (let x in this.carts) {
        if (this.carts[x].product.id == id) {
          return Number.parseInt(x)
        }
      }
    }
    return -1;
  }

  AddCart(id: number) {
    if (sessionStorage.getItem("myCart")) {
      if (this.carts != null) {
        let index = this.IsExist(id)
        if (index != -1) {
          this.carts[index].quantity += 1
        }
        else {
          let product = this.products.find(c => c.id == id)
          if (product != null) {
            this.carts.push({ product: product, quantity: 1 })
          }
        }
        sessionStorage.setItem('myCart', JSON.stringify(this.carts))
        Swal.fire({
          text: 'Thêm thành công',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    }
    else {
      let carts: ICart[] = []
      let product = this.products.find(c => c.id == id)
      if (product != null) {
        carts.push({ product: product, quantity: 1 })
        sessionStorage.setItem('myCart', JSON.stringify(carts))
        Swal.fire({
          text: 'Thêm thành công',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    }
  }

  RemoveCart(id: number) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa',
      showDenyButton: true,
      icon: "warning",
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        let index = this.IsExist(id);
        if (index != -1) {
          this.carts.splice(index, 1)
          sessionStorage.setItem('myCart', JSON.stringify(this.carts))
          this.LoadData()
          Swal.fire('Đã xóa!', '', 'success')
        }
      }
    })
  }

  SearchProduct(textSearch:string){
    if(textSearch == ''){
      this.products = this.productsOld
    }else{
      this.products = this.productsOld.filter(c => c.name.toLowerCase().includes(textSearch.toLowerCase()))
    }
  }
}
