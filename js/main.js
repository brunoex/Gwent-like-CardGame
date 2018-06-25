$(document).ready(function(){
    
    //Main stuff
    var lanesumme = 0;
    var hand = [];
    //turn
    var turnsumme = 0;
    var turnpassAi = 0; //0 to no 1 to yes
    //AI
    var lanesummeAi = 0;
    var handAi = [];
    //Rounds and points
    var round = 1;
    var points = 0;
    var pointsAi = 0;
    
    
    //******
    // Create the pile of shuffled cards
    var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    numbers.sort( () => { return Math.random() - .5 } );
    //transplant to Hand[]
    var hand = numbers.splice(1,5);
    console.log(`Hand: ${hand}`);
    
    // Create the pile of shuffled cards for AI
    var numbersAi = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    numbersAi.sort( () => { return Math.random() - .5 } );
    //transplant to HandAi[]
    var handAi = numbersAi.splice(1,5);
    console.log(`HandAI: ${handAi}`);
    //******
        


//reset function    
$('#reset').click(function(){

  $('#cardPile').html('');
  $('#cardSlots').html('');
    
  $('#cardSlotsAi').html('');    
  $('#cardPileAi').html(''); 
    $(init);
    $(ai);
    

});
    
//Function to initiate the game    
function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );
    
  // Create cards    
  for ( var i=0; i<5; i++ ) {
    $('<div>' + hand[i] + '</div>').data( 'number', hand[i] ).attr( 'id', 'card' + hand[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  var words = [ 'Slot One', 'Slot Two', 'Slot Three', 'Slot Four', 'Slot Five' ];
  for ( var i=1; i<=5; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}
    
//Function to handle player cards DROP
function handleCardDrop(event, ui) {

    var cardNumber = ui.draggable.data('number');
  

    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    
    //Set positioning after drop drop **********
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    });
    //This prevents the card from being pulled
    ui.draggable.draggable('option', 'revert', false);
    
    //Total points
    lanesumme += cardNumber; 
    $('#lanenumber').html(lanesumme);
    
    //Remove played card from hand
    hand.splice($.inArray(cardNumber, hand), 1);
    console.log(`Hand after splice: ${hand}`);
    
    //Run turn
    $(turn);
    console.log(`Turn count: ${turnsumme}`);
  
}
    
//Turn control    
function turn() {
    turnsumme++;  
    
    if(round > 0 && hand.length <= 1){
      $('#cardainew').position({
            of: $('#slotAi5'), my: 'left top', at: 'left top'
        });
    
        var cardNumber = $('#cardainew').data('number'); 
        $('#cardainew').html(cardNumber);
    }  
    
    //If Ai hand is empty
    if(handAi.length === 1){
       turnpassAi = 1;
        
        //Check who win
        if(lanesumme > lanesummeAi){
          points++; 
           }else{
               pointsAi++;
               
           }
        
        alert('Empty Ai Hand! Ai passes and you got a point');
    }else{
    //Ai acts per turn - AI*
    if(turnsumme == 1){
        $('#cardai0').position({
            of: $('#slotAi1'), my: 'left top', at: 'left top'
        });
    
        var cardNumber = $('#cardai0').data('number');
        $('#cardai0').html(cardNumber);
    }
    if(turnsumme == 2){
        $('#cardai1').position({
            of: $('#slotAi2'), my: 'left top', at: 'left top'
        });
    
        var cardNumber = $('#cardai1').data('number');
        $('#cardai1').html(cardNumber);
    }
    if(turnsumme == 3){
        $('#cardai2').position({
            of: $('#slotAi3'), my: 'left top', at: 'left top'
        });
    
        var cardNumber = $('#cardai2').data('number');
        $('#cardai2').html(cardNumber);
    }
    if(turnsumme == 4){
        $('#cardai3').position({
            of: $('#slotAi4'), my: 'left top', at: 'left top'
        });
    
        var cardNumber = $('#cardai3').data('number');
        $('#cardai3').html(cardNumber);
    }
    if(turnsumme == 5){
        $('#cardai4').position({
            of: $('#slotAi5'), my: 'left top', at: 'left top'
        });
    
        var cardNumber = $('#cardai4').data('number');
        $('#cardai4').html(cardNumber);
        
    }  
    }//End else    
    
    //Make things happen!
    lanesummeAi += cardNumber;
    console.log('Ai card: ' + cardNumber);
    
    $('#lanenumberAi').html(lanesummeAi);
    console.log('Ai LANE: ' + lanesummeAi);
    
    //Make splice in Hand, to take out the card dropped on table
    handAi.splice($.inArray(cardNumber, handAi), 1);
    console.log('Hand after splice AI: '+ handAi);
    
    
//Points given per Round *****
    $(checkWin);         
} 
    
//Ai functions and cards
function ai(){
    
  //Hand for AI  
  for ( var i=0; i<5; i++ ) {
    $('<div>' + '</div>').data( 'number', handAi[i] ).attr( 'id', 'cardai' + i ).appendTo( '#cardPileAi' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }//ende for
    
     // Create the card slots
  var words = [ 'AI', 'AI', 'AI', 'AI', 'AI' ];
  for ( var i=1; i<=5; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).attr( 'id', 'slotAi' + i ).appendTo( '#cardSlotsAi' );
  }
    
}
    
function passTurn(){
    
    //Ai check if can win
    if(turnsumme < 5){
       turnpassAi = 1; //Ai says 'ok I pass'
        $(turn);
       
    }

    //Clean timeout - Pass turn
    setTimeout(function(){ 
        alert("New Turn is about to begin!");
        $('#cardSlots').html('');
        $('#cardSlotsAi').html('');    
        $('#cardPile').html( '' );  
        $('#cardPileAi').html(''); 
        
        //New round variables
        lanesumme = 0;
        lanesummeAi = 0;
        $('#lanenumberAi').html(lanesummeAi);
        $('#lanenumber').html(lanesumme);
        
        turnsumme = 0; 
        
        $(newTurn);
        
        
    }, 500); //Ende clean timeout
       
    
}// Ende passTurn
    
//Create a new turn after the fist phase    
function newTurn(){
    
    //Set new turn for player ******
    for ( var i=0; i < hand.length; i++ ) {
    $('<div>' + hand[i] + '</div>').data( 'number', hand[i] ).attr( 'id', 'card' + hand[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }
    //Give new card to player
    $('<div>' + numbers[0] + '</div>').data( 'number', numbers[0] ).attr( 'id', 'card' + numbers[0] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
    hand.push(numbers[0]);
    numbers.splice(0, 1);
 

  // Create the card slots
  var words = [ 'one', 'two', 'three', 'four', 'five' ];
  for ( var i=1; i<=5; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
    
    //Set new turn for AI *******
    //Hand for AI  
  for ( var i=0; i<handAi.length; i++ ) {
    $('<div>' +  '</div>').data( 'number', handAi[i] ).attr( 'id', 'cardai' + i ).appendTo( '#cardPileAi' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }//ende for
    //Give new card to AI
    $('<div>' +  '</div>').data( 'number', numbersAi[0] ).attr( 'id', 'cardainew').appendTo( '#cardPileAi' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
    handAi.push(numbersAi[0]);
    numbersAi.splice(0, 1);
    
    console.log('hand AI: '+handAi);
    console.log('hand Player: '+hand);
    
    
     // Create the card slots
  var words = [ 'AI', 'AI', 'AI', 'AI', 'AI' ];
  for ( var i=1; i<=5; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).attr( 'id', 'slotAi' + i ).appendTo( '#cardSlotsAi' );
  }
    
}
    
function checkWin(){
     //Check if end game
    
    // Win
    if(turnpassAi == 1 && lanesumme > lanesummeAi){
        turnpassAi = 0;
        
        points++;
        console.log(`Round player ${points}`);
        $(`<div class="pointsBtn"> Round ${round} is a Win! </div>`).appendTo( '#content' );
        round++;
    }
    //Loss
    if(turnpassAi == 1 && lanesumme < lanesummeAi){
        turnpassAi = 0;
        
        pointsAi++;
        console.log(`Round AI ${pointsAi}`);
        $(`<div class="pointsBtn"> Round ${round} is a Lose </div>`).appendTo( '#content' );
        round++;
    }
    //Draw
    if(turnpassAi == 1 && lanesumme == lanesummeAi){
        turnpassAi = 0;
        
        pointsAi++;
        points++;
        console.log(`Round AI ${pointsAi}`);
        console.log(`Round player ${points}`);
        $(`<div class="pointsBtn"> Round ${round} is a Draw! 1 point for you and one for AI</div>`).appendTo( '#content' );
        round++;
    }
    if(points == 2){
        
        alert('You Win the game!');
        $(`<div class="pointsBtn"> You won the Game! Refresh page </div>`).appendTo( '#content' );
        //reset game
         $('#cardPile').html('');
        $('#cardSlots').html('');
    
        $('#cardSlotsAi').html('');    
        $('#cardPileAi').html(''); 
        handAi = [];
        hand = [];
        $(init);
        $(ai);
        $('#pass').remove();
        
    }
    if(pointsAi == 2){
        
        alert('You Lose the game!');
        $(`<div class="pointsBtn"> You lost the Game! Refresh page </div>`).appendTo( '#content' );
        //reset game
        $('#cardPile').html('');
        $('#cardSlots').html('');
    
        $('#cardSlotsAi').html('');    
        $('#cardPileAi').html(''); 
        handAi = [];
        hand = [];
        $(init);
        $(ai);
        $('#pass').remove();
        
    }
}
    
//Pass turn Button    
$('#pass').click(function(){

  $(passTurn); 
    
});    
    
$(ai);
$(init);

    
})

