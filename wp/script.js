//Brandon Blanchard
//1280x720 screen scaled to half size
//http://i-cdn.phonearena.com/images/phones/37940-xlarge/Nokia-Lumia-920.jpg

$(document).ready(function() {
     $('.wp-large div, .wp-med div, .wp-small div' ).each(function(tile) {
        var thisPos = $(this).offset(),
        screen = $('#lumia-screen').offset();
        
      console.log('background-position-y', '-' + (thisPos.top - screen.top) + 'px');
      
        $(this).css('background-position-y', '-' + (thisPos.top - screen.top) + 'px');
        $(this).css('background-position-x', '-' + (thisPos.left - screen.left) + 'px');
    });
});