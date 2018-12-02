export interface Order{
    id?:string;
    content?:string;
    quantity?:number;
    isServed?:boolean;
    isCanceled?:boolean;
    created_at:Date;
  } 