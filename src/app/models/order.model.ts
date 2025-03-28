export interface Order{
    id?:string,
    name:string,
    date:string,
    place:string,
    status:'Placed' |'Processing' |'On the way'|'Delivered';
}