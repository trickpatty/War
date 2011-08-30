Card.HEARTS = 'Hearts';
Card.SPADES = 'Spades';
Card.CLUBS = 'Clubs';
Card.DIAMONDS = 'Diamonds';

Card.ACE = 1;
Card.JACK = 11;
Card.QUEEN = 12;
Card.KING = 13;

Card.SUITS = [Card.HEARTS, Card.SPADES, Card.CLUBS, Card.DIAMONDS];
Card.VALUES = [' ', 'A', '2', '3',
               '4', '5', '6', '7',
               '8', '9', '10',
               'J', 'Q', 'K'];

function Card(value, suit) {
    this.value = value;
    this.suit = suit;
}

Card.prototype.getValue = function() {
    return this.value;
};

Card.prototype.getSuit = function() {
    return this.suit;
};

Card.prototype.toString = function() {
    var valueName = Card.VALUES[this.value];
    return valueName;
};

Card.createDeck = function() {
    var deck = [];

    for (var suit = 0; suit < Card.SUITS.length; suit++) {
        for (var value = 1; value < Card.VALUES.length; value++) {
            var card = new Card(value, Card.SUITS[suit]);
            deck.push(card);
        }
    }

    return deck;
}
