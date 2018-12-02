import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  order:Order ={
    content:'',
    quantity:0,
    created_at: new Date,
    isServed:false,
    isCanceled:false
  }

  constructor( public orderService:OrderService) { }

  ngOnInit() {

  }

  onSubmit(){
    if(this.order.content != '' && this.order.quantity != 0 ){
      // alert('Working');
      this.order.created_at = new Date;
      this.orderService.addOrder(this.order);
      this.order.content = '';
      this.order.quantity = 0;
    }
  }


}
