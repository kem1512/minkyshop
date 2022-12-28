import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductdetailComponent } from './productdetail/productdetail.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'productdetail', component: ProductdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
