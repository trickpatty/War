function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        var newIndex = Math.floor(Math.random() * deck.length);
        var temp = deck[newIndex];
        deck[newIndex] = deck[i];
        deck[i] = temp;
    }
}

function printDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        console.log(deck[i].toString());
    }
}

var HIGHEST_VALUE = Card.VALUES.length;

function compareCards(firstCard, secondCard) {
    a = (firstCard.value == Card.ACE) ? HIGHEST_VALUE : firstCard.value; 
    b = (secondCard.value == Card.ACE) ? HIGHEST_VALUE : secondCard.value; 

    if (a == b) {
        return EQUAL;
    }
    else if(a < b) {
        return LESS_THAN;
    }
    else {
        return GREATER_THAN;
    }
}

function distributeCards(seedDeck, playerDeck, computerDeck) {
    while (seedDeck.length > 1) {
        playerDeck.push(seedDeck.pop());
        computerDeck.push(seedDeck.pop());
    }
}

function startGame() {
    var seedDeck = Card.createDeck();
    shuffleDeck(seedDeck);

    var playerDeck = [];
    var computerDeck = [];
    distributeCards(seedDeck, playerDeck, computerDeck);

    console.log('*****Player********');
    printDeck(playerDeck);

    console.log('*****Computer******');
    printDeck(computerDeck);

    do
    {
       playRound(playerDeck, computerDeck); 
    }
    while (playerDeck.length > 1 && computerDeck.length > 1);

    if (playerDeck.length < 1) {
        console.log('Player won!');
    }
    else {
        console.log('Computer won!');
    }
}

var PLAYER_LOST = -1;
var TIE = 0;
var PLAYER_WON = 1;

function playRound(playerDeck, computerDeck) {
    var playerCard = playerDeck.shift();
    var computerCard = computerDeck.shift();
    var result = compareCards(playerCard, computerCard);
    var cards = [playerCard, computerCard];

    if (result == TIE) {
        war(playerDeck, computerDeck, cards);
    }
    else if (result == PLAYER_WON) {
        transferCardsToWinner(playerDeck, cards);
    }
    else if (result == PLAYER_WON) {
        transferCardsToWinner(computerDeck, cards);
    }
}

function war(playerDeck, computerDeck, cards) {
    var playerHasEnough = (playerDeck.length >= 2);
    var computerHasEnough = (playerDeck.length >= 2);

    if (!playerHasEnough) {
        transferCardsToWinner(computerDeck, cards);
        return;
    }
    else if (!computerHasEnough) {
        transferCardsToWinner(playerDeck, cards);
        return;
    }

    cards.push(playerDeck.shift());
    var playerCard = playerDeck.shift();

    cards.push(computerDeck.shift());
    var computerCard = computerDeck.shift();

    var result = compareCards(playerCard, computerCard);

    if (result == TIE) {
        war(playerDeck, computerDeck, cards);
    }
    else if (result == PLAYER_WON) {
        transferCardsToWinner(playerDeck, cards);
    }
    else if (result == PLAYER_WON) {
        transferCardsToWinner(computerDeck, cards);
    }
}

function transferCardsToWinner(deck, cards) {
    for (var i = 0; i < cards.length; i++) {
        toDeck.push(cards.shift());
    }
}
