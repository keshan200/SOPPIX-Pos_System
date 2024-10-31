import Customer from "../models/customer_model.js"; //if use deafutl in model using "{}"

import {cusArray,itemArray,orderArray} from "../db/database.js";



//selected index
let select_cus_indx = null

const loadData = () => {
    $("#CusTbl").empty();


    cusArray.map((cus,index)=>{
        let cusData =
            `<tr>
                <td>${cus.name}</td>  
                <td>${cus.addres}</td>  
                <td>${cus.email}</td>  
                <td>${cus.tel}</td>              
            </tr>`

        $('#CusTbl').append(cusData);

        console.log(cusData)
    });
};

const clear = ()=>{
    $('#name').val('');
    $('#adrs').val('');
    $('#mail').val('');
    $('#tel').val('');
}

const validateEmail = (mail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(mail);
}

const validateMobile = (Custel) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(Custel);
}


$('#Cussave').on('click', () => {
    let id = cusArray.length+1;
    let cusName = $('#name').val();
    let cusAddrs = $('#adrs').val();
    let mail = $('#mail').val();
    let cusTel = $('#tel').val();

    // Check duplicate email or mobile
    const isDuplicate = cusArray.some(customer => customer.mail === mail || customer.tel === cusTel);

    console.log("click");

    if(cusName.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid First Name",
        });
    } else if(cusAddrs.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Last Name",
        });
    } else if(!validateEmail(mail)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    } else if(!validateMobile(cusTel)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else if (isDuplicate) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Customer with this Email or Mobile has already been registered",
        });

    } else {

        let customer = new Customer(
            cusName,
            cusAddrs,
            mail,
            cusTel
        );

        cusArray.push(customer);
        Swal.fire("Customer Saved!");

        clear()
        loadData()
    }
});


$('#CusTbl').on('click', "tr", function() {

    let index = $(this).index();
    let SelectCusindex = $(this).index();

     select_cus_indx = $(this).index(); //selected index for updating

    let cus_obj = cusArray[index];

    //customer Data
    let name = cus_obj.name;
    let addres = cus_obj.addres;
    let email = cus_obj.email;
    let tel = cus_obj.tel;


    //set data for txt fields
    $('#name').val(name);
    $('#adrs').val(addres);
    $('#mail').val(email);
    $('#tel').val(tel);


});


$('#cusUpdt').on('click', () => {

    console.log('click')
    if (select_cus_indx === null) {
        Swal.fire("Error", "Please select a customer to update.", "error");
        return;
    }

    let id = cusArray[select_cus_indx].id;
    let name = $('#name').val();
    let addres = $('#adrs').val();
    let mail = $('#mail').val();
    let tel = $('#tel').val();


    let updatedCustomer = new Customer(id, name, addres, mail, tel);


    cusArray[select_cus_indx] = updatedCustomer;

    loadData();
    clear();

    Swal.fire("Success", "Customer updated successfully!", "success");

});


$('#cusDlt').on('click',()=>{

    console.log(cusArray)



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

            cusArray.splice(select_cus_indx,1);
            clear();
            loadData();

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
})


$('#cusClr').on('click',()=>{
    clear();
})
