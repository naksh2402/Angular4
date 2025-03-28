export interface Order{
     id?: string;
  userId: string;
  items: any[];
  totalAmount: number;
    status:'Placed' |'Processing' |'On the way'|'Delivered';
  createdAt: string; 
}