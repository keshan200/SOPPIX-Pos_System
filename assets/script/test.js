import {cusArray} from "./db/database";

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
