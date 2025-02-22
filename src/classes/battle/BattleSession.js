const Player = require('./Player.js');

class BattleSession {
  static sessionList = [];

  constructor(id, player1Id, player2Id, turn, duration, startDate, deck1, deck2, blood1, blood2, isPvP = true) {
    this.id = id;
    this.player1 = new Player(player1Id, deck1, blood1);
    this.player2 = new Player(player2Id, deck2, blood2);
    this.turn = turn;
    this.duration = duration;
    this.startDate = startDate;
    this.isPvP = isPvP;
    this.readyPlayers = [];
    this.currentTurnPlayerId = this.chooseFirstPlayer();
    BattleSession.sessionList.push(this);
  }

  chooseFirstPlayer() {
    return Math.random() < 0.5 ? this.player1.id : this.player2.id;
  }
  static findBattleSessionById(sessionid) {
    return BattleSession.sessionList.find((battleSession) => battleSession.id.toString() === sessionid.toString()) || null;
  }

  static deleteBattleSessionById(id) {
    BattleSession.sessionList = BattleSession.sessionList.filter((battleSession) => battleSession.id !== id);
  }

  static findBattleSessionByPlayerId(playerId) {
    return BattleSession.sessionList.find(
      (battleSession) => battleSession.player1.id === playerId || battleSession.player2.id === playerId
    ) || null;
  }

  nextPlayerTurn() {
    this.currentTurnPlayerId = this.currentTurnPlayerId === this.player1.id ? this.player2.id : this.player1.id;
  }
}

module.exports = BattleSession;