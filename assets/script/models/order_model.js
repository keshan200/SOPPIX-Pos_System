export default class Order{

     constructor(orderId,date,cusTel,itmCode,orderQty,total) {

         this._orderId = orderId;
         this._date = date;
         this._cusTel = cusTel;
         this._itmCode = itmCode;
         this._orderQty = orderQty;
         this._total = total;
     }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get cusTel() {
        return this._cusTel;
    }

    set cusTel(value) {
        this._cusTel = value;
    }

    get itmCode() {
        return this._itmCode;
    }

    set itmCode(value) {
        this._itmCode = value;
    }

    get orderQty() {
        return this._orderQty;
    }

    set orderQty(value) {
        this._orderQty = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}