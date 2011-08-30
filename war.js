var PLAYER_LOST = -1;
var TIE = 0;
var PLAYER_WON = 1;

function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        var newIndex = Math.floor(Math.random() * deck.length);
        var temp = deck[newIndex];
        deck[newIndex] = deck[i];
        deck[i] = temp;
    }
}

function printDeck(deck) {
    var text = '';

    for (var i = 0; i < deck.length; i++) {
        text += deck[i].toString() + ' ';
    }

    console.log(text);
}

function adjustCardValue(card) {
    var HIGHEST_VALUE = Card.VALUES.length;

    if (card.getValue() == Card.ACE) {
        return HIGHEST_VALUE;
    }

    return card.getValue();
}

function compareCards(playerCard, computerCard) {
    a = adjustCardValue(playerCard);
    b = adjustCardValue(computerCard);

    if (a == b) {
        return TIE;
    }
    else if(a < b) {
        return PLAYER_LOST;
    }
    else {
        return PLAYER_WON;
    }
}

function distributeCards(seedDeck, playerDeck, computerDeck) {
    while (seedDeck.length >= 2) {
        playerDeck.push(seedDeck.pop());
        computerDeck.push(seedDeck.pop());
    }
}

function transferCardsToWinner(deck, cards) {
    while (cards.length > 0) {
        deck.push(cards.shift());
    }
}

function startGame() {
    var seedDeck = Card.createDeck();
    shuffleDeck(seedDeck);

    var playerDeck = [];
    var computerDeck = [];
    distributeCards(seedDeck, playerDeck, computerDeck);
    var totalRounds = 0;

    do
    {
       printDeck(playerDeck);
       printDeck(computerDeck);

       war(playerDeck, computerDeck); 
       totalRounds++;

       if (totalRounds > 20000) {
           alert('infinite war!');
           break;
       }
    }
    while (playersHaveCards(playerDeck, computerDeck));

    if (playerDeck.length == 0) {
        alert('Computer won in ' + totalRounds + ' rounds');
    }
    else {
        alert('Player won in ' + totalRounds + ' rounds');
    }
}

function playersHaveCards(playerDeck, computerDeck) {
    return (playerDeck.length >= 1 && computerDeck.length >= 1);
}

function drawCardsFromDeck(deck, totalCards) {
    var cards = [];

    for (var i = 0; i < totalCards; i++) {
        cards.push(deck.shift());
    }

    return cards;
}

function war(playerDeck, computerDeck, cards) {
    cards = cards || [];
    var cardsToDraw = (cards.length == 0) ? 1 : 2;

    var playerHasEnoughCards = (playerDeck.length >= cardsToDraw);
    var computerHasEnoughCards = (computerDeck.length >= cardsToDraw);

    if (!playerHasEnoughCards) {
        transferCardsToWinner(computerDeck, cards);
        transferCardsToWinner(computerDeck, playerDeck);
        return;
    }
    else if (!computerHasEnoughCards) {
        transferCardsToWinner(playerDeck, cards);
        transferCardsToWinner(playerDeck, computerDeck);
        return;
    }

    var playerCards = drawCardsFromDeck(playerDeck, cardsToDraw);
    cards = cards.concat(playerCards);

    var computerCards = drawCardsFromDeck(computerDeck, cardsToDraw);
    cards = cards.concat(computerCards);

    var playerCard = playerCards[playerCards.length - 1];
    var computerCard = computerCards[computerCards.length - 1];
    var result = compareCards(playerCard, computerCard);
    console.log(playerCard.toString(), computerCard.toString(), result);
    console.log('\n');

    if (result == TIE) {
        war(playerDeck, computerDeck, cards);
    }
    else if (result == PLAYER_WON) {
        transferCardsToWinner(playerDeck, cards);
    }
    else if (result == PLAYER_LOST) {
        transferCardsToWinner(computerDeck, cards);
    }
}
