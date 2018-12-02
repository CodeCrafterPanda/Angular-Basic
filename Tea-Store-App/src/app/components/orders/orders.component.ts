import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Order[];
  servedOrders: Order[];
  canceledOrders: Order[];
  newOrders: Order[];
  newShow:Order;
  editState:boolean = false;
  itemToEdit:Order;
  cancelState:boolean = false;
  cancelShow:Order;
  serveState:boolean = false;
  serveShow:Order;
  newState:boolean = false;
  

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      // console.log(items);
      this.orders = orders;
      
    })

    this.orderService.getServedOrders().subscribe(orders => {
      // console.log(items);
      this.servedOrders = orders;

      // this.orders = orders;
      
    })

    this.orderService.getCanceledOrders().subscribe(orders => {
      // console.log(items);
      this.canceledOrders = orders;
      // this.orders = orders;
      
    })
  }

  newShowMethod(event,order){
    this.newShow = order;
    this.newState = true;
  }
  cancelShowMethod(event,order){
    this.cancelShow = order;
    this.cancelState = true;
  }

  clearState(){
    this.cancelShow = null;
    this.cancelState = false;
    this.serveShow = null;
    this.serveState = false;
  }

  showServed(event,order){
    this.serveShow = order;
    this.serveState = !this.serveState;
  }

  onSubmit(order:Order){

    // alert(Date.now());

    order.created_at = new Date;
    this.orderService.updateOrder(order);
    this.clearState();

    }
}

