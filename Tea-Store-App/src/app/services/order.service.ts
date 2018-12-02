import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersCollection:AngularFirestoreCollection<Order>;
  servedOrdersCollection:AngularFirestoreCollection<Order>;
  canceledOrdersCollection:AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;
  servedOrders: Observable<Order[]>;
  canceledOrders: Observable<Order[]>;
  orderDoc: AngularFirestoreDocument<Order>;

  constructor(public afs:AngularFirestore) {
    this.ordersCollection = this.afs.collection('orders',ref => ref.where('isServed', '==', false).where('isCanceled', '==', false));
    this.servedOrdersCollection = this.afs.collection('orders',ref => ref.where('isServed', '==', true));
    this.canceledOrdersCollection = this.afs.collection('orders',ref => ref.where('isCanceled', '==', true));
    // , ref=>ref.orderBy('title','asc') .... second parameter

    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
    )

    this.servedOrders = this.servedOrdersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
    )

    this.canceledOrders = this.canceledOrdersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Order;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
    )

   }

   getOrders(){
    return this.orders;
  }

  getServedOrders(){
    return this.servedOrders;
  }
  getCanceledOrders(){
    return this.canceledOrders;
  }

  addOrder(order:Order){
    // alert(order.content);
    this.ordersCollection.add(order);
  }

  updateOrder(order: Order){
    this.orderDoc = this.afs.doc(`orders/${order.id}`);
    this.orderDoc.update(order);
  }

}
