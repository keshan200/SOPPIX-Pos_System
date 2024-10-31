import Item from "../models/item_model.js";
import {cusArray,itemArray,orderArray} from "../db/database.js";


let  select_itm_indx = null;

const loadData =()=>{
    $('#itmTbl').empty();


    itemArray.map((item,index)=>{
        let itemData =
            `<tr>
              <td>${item.code}</td>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td>${item.qty}</td>
             </tr>`

        $('#itmTbl').append(itemData);

    });

}

const clearf =()=>{
    $('#itmCode').val('');
    $('#itmname').val('');
    $('#itmprice').val('');
    $('#qty').val('');

}

$('#itmTbl').on('click','tr',function(){
    let index = $(this).index();
    let itm_obj = itemArray[index];

   select_itm_indx = $(this).index();

    let codee = itm_obj.code;
    let name = itm_obj.name;
    let price = itm_obj.price;
    let qty = itm_obj.qty;

    $('#itmCode').val(codee);
    $('#itmname').val(name);
    $('#itmprice').val(price);
    $('#qty').val(qty);

});


$('#ItmClr').on('click',()=>{
    clearf();

    console.log('hds');
});


$('#Itmsave').on('click',()=>{

    let code = $('#itmCode').val();
    const isDuplicate = itemArray.some(item => item.code === code );


    if(isDuplicate) {

        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Item has already been registered",
        });
        clearf()

    }else{

    /*let code = $('#itmCode').val();*/
    let name = $('#itmname').val();
    let price =$('#itmprice').val();
    let qty = $('#qty').val();


    let item = new Item(code,name,price,qty);

    itemArray.push(item);
    Swal.fire("Item Added!");

    clearf();
    loadData();
    }
});



$('#ItmUpt').on('click',()=>{


    console.log(itemArray)
    if (select_itm_indx === null) {
        Swal.fire("Error", "Please select a Item to update.", "error");
    }
    let code = $('#itmCode').val();
    const isDuplicate = itemArray.some(item => item.code === code );

    if (isDuplicate){
        Swal.fire({
            icon: "error",
            title: "already registered",
            text: "Item has already been registered",
        });
        clearf()
    }else{


     let name = $('#itmname').val();
     let price = $('#itmprice').val();
     let qty = $('#qty').val();

     let updateitm = new Item(code,name,price,qty);

     itemArray[select_itm_indx]=updateitm

    console.log(itemArray)

    Swal.fire("Success", "Item updated successfully!", "success");

    loadData()
    clearf()
    }
});



 $('#ItmDlt').on('click',()=>{
    console.log("clickd");

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            itemArray.splice(select_itm_indx,1);
            clearf();
            loadData();

            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success"
            });
        }
    });
});