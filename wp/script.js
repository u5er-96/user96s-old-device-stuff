$('#animator').on('mouseover',function(){
   $('.tile').addClass('leftRotate').removeClass('rightRotate'); 
});
    
$('#animator').on('mouseout',function(){
   $('.tile').addClass('rightRotate').removeClass('leftRotate'); 
});