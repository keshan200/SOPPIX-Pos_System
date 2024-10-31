import Order from "../models/order_model.js";
import CartModel from "../models/CartModel.js";
import {cusArray,itemArray,orderArray} from "../db/database.js";





$('#CustomerID').on('click', () => {
    cusArray.forEach(customer => {
        const isCustomerAdded = Array.from(document.getElementById('CustomerID').options).some(option => {
            const existingCustomer = JSON.parse(option.value);
            return existingCustomer._tel === customer.tel;
        });

        if (!isCustomerAdded) {
            const option = document.createElement("option");
            option.value = JSON.stringify(customer);
            option.text = customer.tel; // Show customer telephone number
            document.getElementById('CustomerID').appendChild(option);
        }
    });
});


$('#CustomerID').on('click', () => {
    const selectedOption = $('#CustomerID option:selected');

    if (selectedOption.length > 0) {
        const selectedCustomer = JSON.parse(selectedOption.val());
        let name = selectedCustomer._name;
        let adrs = selectedCustomer._addres;

        $('#cusName').val(name);
        $('#Address').val(adrs);

        console.log("name",name);
        console.log("adrs",adrs)


    } else {
        console.log('No option selected');
    }
});


function findHighestOrderNumber() {
    let highestOrderNumber = 0;

    for (const order of orderArray) {
        const orderNumber = parseInt(order.orderId.slice(1), 10);
        if (!isNaN(orderNumber) && orderNumber > highestOrderNumber) {
            highestOrderNumber = orderNumber;
        }
    }
    return highestOrderNumber;
}

const gen_nxt_Oid = () => {
    const lastOrderNumber = findHighestOrderNumber();
    const nextOrderNumber = lastOrderNumber + 1;

    const orderID = 'O' + nextOrderNumber.toString().padStart(3,'0');
    return orderID;
};

let orderID = gen_nxt_Oid();
$('#OrderID').val(orderID);


/*item operations*/

$('#Item').on('click', () => {
    itemArray.forEach(itm => {
        const isItmAdd = Array.from(document.getElementById('Item').options).some(option => {
            const existingITM = JSON.parse(option.value);
            return existingITM._name === itm.name;
        });

        if (!isItmAdd){
            const option = document.createElement("option");
            option.value = JSON.stringify(itm);
            option.text = itm.name;
            document.getElementById('Item').appendChild(option);

            console.log('item',option.text)
        }
    });
});


$('#Item').on('click', () => {

    const  select = $('#Item option:selected');
    if (select.length > 0){
        const selectItm = JSON.parse(select.val());

        //txt eke show wenn ona item set eka
         let code = selectItm._code;
         let itmName =  selectItm._name;
         let price = selectItm._price;
         let qty = selectItm._qty;

         $('#ItemCode').val(code);
         $('#ItemName').val(itmName);
         $('#Price').val(price);
         $('#QtyOnHand').val(qty);


    } else {
    console.log('No option selected');
}
});



let cartItems = [];

export const loadToCart = () => {
    $("#cart").empty();
    cartItems.forEach((item) => {
        let row = `<tr><td>${item.itemCode}</td><td>${item.itemName}</td><td>${item.price}</td><td>${item.qty}</td><td>${item.total}</td></tr>`;
        $("#cart").append(row);

        console.log("row",row);
    });

};








export const setTotalValues = () => {
    let netTotal = cartItems.reduce((acc, item) => acc + item.total, 0);

    console.log("net",netTotal)

    $("#tot").text(`Rs.${netTotal.toFixed(2)}`);
    $("#sub").val(netTotal.toFixed(2));
};


const clear = () =>{

}

export const clearQty = () => {
    $('#qty').val("");
};

$("#addCart").on("click", function () {
    let itemCode = $('#ItemCode').val();
    let itemName = $('#ItemName').val();
    let price = parseFloat($('#Price').val());
    let qtyOnHand = parseInt($('#QtyOnHand').val());
    let orderQuantity = parseInt($('#OrderQuantity').val());

    if (orderQuantity <= qtyOnHand) {
        let total = price * orderQuantity;
        let cartItem = new CartModel(itemCode, itemName, price, orderQuantity, total);
        cartItems.push(cartItem);

        loadToCart();
        clearQty();
        setTotalValues();
    } else {
        alert("Insufficient quantity on hand.");
    }
});


$("#purchase").on("click", function () {

    let cash= $("#Cash").val()
    let netTotal = cartItems.reduce((acc, item) => acc + item.total, 0);
    let balance = cash-netTotal;
    $("#Balance").val(balance);

    let oID = $('#OrderID').val();
    let Date = $('#Date').val();
    let cusTel = $('#CustomerID').val();
    let ICode = $('#ItemCode').val();
    let Tot = $('#tot').text;

   let order =   new Order(oID,Date,cusTel,ICode,Tot);

  let isPlaced= orderArray.push(order);


  if (isPlaced){
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order has been saved",
          showConfirmButton: false,
          timer: 1500
      });

  }else{
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Order placed successfully!",
          footer: '<a href="#">Why do I have this issue?</a>'
      });
  }


    console.log(orderArray);

});
