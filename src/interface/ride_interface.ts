export default interface RideInterface{
    name:string;
    ridersCount:number;
    city:string;
    lat:number;
    long:number;
    uuid:string;
}
export interface RideWithDistance extends RideInterface {
    distance: number;
  }