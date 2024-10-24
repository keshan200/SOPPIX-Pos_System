
$('#homeNav').on('click',()=>{
    $('#homePage').css('display', 'block');     // show
    $('#customerPage').css('display', 'none');
    $('#itemPage').css('display', 'none');
    $('#orderPage').css('display', 'none');
});




$('#customerNav').on('click',()=>{
    $('#homePage').css('display','none');
    $('#customerPage').css('display','block');
    $('#itemPage').css('display','none');
    $('#orderPage').css('display','none');
})


$('#itemNav').on('click',()=>{
    $('#homePage').css('display','none');
    $('#customerPage').css('display','none');
    $('#itemPage').css('display','block');
    $('#orderPage').css('display','none');
})


$('#orderNav').on('click',()=>{
    $('#homePage').css('display','none');
    $('#customerPage').css('display','none');
    $('#itemPage').css('display','none');
    $('#orderPage').css('display','block');
})


