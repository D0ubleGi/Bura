export class Cards{


    static shuffle<T>(array: T[]): T[] {
  const arr = [...array]; 
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

static Random(){
 const str = 'qwertyuioplkjhgfdsazxcvbnm';
 let stri='';
 for(let j=0;j<7;j++){
    stri+=str[Math.floor(Math.random()*str.length)];
 }
 return stri;
}

 static Getturn(Turn:any,players:any){

  let randomNumber;

  if(Turn===''){

    randomNumber = Math.floor(Math.random() * 4);

    Turn = players[randomNumber!]+String(randomNumber);
  }

  else{

    let str = Turn[Turn.length-1];

    if(str==='3'){
      Turn = players[0]+'0';
      str=0;
    }
    else{
      Turn = players[Number(str)+1]+String(Number(str)+1);
    }
  }

  return Turn;

}
static Checkcards(
  Cards: Record<string, string[]>,
  players: string[],
  serve: string,
  trumps: string
) {

  type Suit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
  type Rank = '6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K'|'A';

  type Card = {
    suit: Suit;
    rank: Rank;
    player: string;
  };

  const rankValue: Record<Rank, number> = {
    '6':1,'7':2,'8':3,'9':4,
    'J':5,'Q':6,'K':7,'10':8,'A':9
  };

  const pointValue: Record<Rank, number> = {
    '6':0,'7':0,'8':0,'9':0,
    'J':2,'Q':3,'K':4,'10':10,'A':11
  };

  const parseCard = (path: string, player: string): Card => {

    const clean = path
      .replace(/^url\(["']?/, '')
      .replace(/["']?\)$/, '');

    const file = clean
      .split('/')
      .pop()!
      .replace('.png','')
      .toLowerCase();

    const parts = file.split('_');

    const rankMap: Record<string, Rank> = {
      '6':'6','7':'7','8':'8','9':'9','10':'10',
      'jack':'J','queen':'Q','king':'K','ace':'A'
    };

    return {
      rank: rankMap[parts[0]],
      suit: parts[2] as Suit,
      player
    };
  };

  const hands: Record<string, Card[]> = {};
  for (const p of players) {
    hands[p] = (Cards[p] || []).map(c => parseCard(c, p));
  }

  const trickCount = hands[serve].length;

  for (const p of players) {
    if (hands[p].length !== trickCount) {
      throw new Error(`${p} must play ${trickCount} cards`);
    }
  }

  let totalPoints = 0;
  for (const p of players) {
    for (const card of hands[p]) {
      totalPoints += pointValue[card.rank];
    }
  }

  const startIndex = players.indexOf(serve);
  const order = [
    ...players.slice(startIndex),
    ...players.slice(0, startIndex)
  ];

  const beats = (defender: Card, attacker: Card): boolean => {

    if (attacker.suit === trumps && defender.suit !== trumps)
      return true;

    if (attacker.suit === trumps && defender.suit === trumps)
      return rankValue[attacker.rank] > rankValue[defender.rank];

    if (attacker.suit === defender.suit)
      return rankValue[attacker.rank] > rankValue[defender.rank];

    return false;
  };

  const canBeatAllCards = (
    winners: Card[],
    challengers: Card[]
  ): boolean => {

    const used = new Array(challengers.length).fill(false);

    const backtrack = (index: number): boolean => {

      if (index === winners.length) return true;

      for (let i = 0; i < challengers.length; i++) {

        if (used[i]) continue;

        if (beats(winners[index], challengers[i])) {

          used[i] = true;

          if (backtrack(index + 1)) return true;

          used[i] = false;
        }
      }

      return false;
    };

    return backtrack(0);
  };

  let currentWinner = serve;
  let winningCards = [...hands[serve]];

  for (let i = 1; i < order.length; i++) {

    const challenger = order[i];
    const challengerCards = hands[challenger];

    if (canBeatAllCards(winningCards, challengerCards)) {
      currentWinner = challenger;
      winningCards = challengerCards;
    }
  }

  return {
    winner: currentWinner,
    playedCards: hands,
    totalPoints
  };
}


}