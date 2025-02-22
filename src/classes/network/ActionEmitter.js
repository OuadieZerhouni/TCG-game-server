class ActionEmitter {
    constructor(io) {
        this.io = io;
    }

    emitInitialGameData(socket, battleSession) {
        const gameData = {
            deck1: battleSession.player1.deck.cards,
            deck2: battleSession.player2.deck.cards,
            initialData: true,
            localPlayerId: socket.user._id,
            OpponentId: (battleSession.player1.id === socket.user._id ? battleSession.player2.id : battleSession.player1.id).toString(),
        };
        socket.emit("initialAction", gameData);
    }

    emitBattleEndAction(battleSession, winnerId) {
        const battleEndAction = {
            turn: battleSession.turn,
            actionType: "gameOver",
            playerId: winnerId,
        };
        this.io.to(battleSession.id).emit("actions", [battleEndAction]);
    }

    emitAttackActions(socket, battleSession, attackerCard, attackedCard) {
        const attackAction = {
            turn: battleSession.turn++,
            actionType: "attackCard",
            playerId: socket.user._id,
            initiatorCard: attackerCard,
            targetCardList: [attackedCard],
        };
        this.io.to(battleSession.id).emit("actions", [attackAction]);

        if (attackedCard.blood == 0) {
            const killAction = {
                turn: battleSession.turn,
                actionType: "killCard",
                playerId: socket.user._id,
                targetCardList: [attackedCard],
            };
            this.io.to(battleSession.id).emit("actions", [killAction]);
        }
    }

    emitDrawAction(socket, battleSession, playerId, drawnCard) {
        const drawAction = {
            turn: battleSession.turn++,
            actionType: "drawCard",
            playerId: playerId,
            initiatorCard: drawnCard,
        };
        console.log(`Emitting draw action to room ${battleSession.id}`);
        for (let [room, _] of this.io.sockets.adapter.rooms) {
            console.log(`Room ${room} has clients: ${this.io.sockets.adapter.rooms.get(room)}`);
        }
        this.io.to(battleSession.id).emit("actions", [drawAction]);
    }

    emitPlayAction(socket, battleSession, playedCard) {
        const playAction = {
            turn: battleSession.turn,
            actionType: "playCard",
            playerId: socket.user._id,
            initiatorCard: playedCard,
        };
        this.io.to(battleSession.id).emit("actions", [playAction]);
    }
    /**
     * 
     * @param {BattleSession} battleSession 
     * @param {int} userId 
     */
    emitSurrenderAction(battleSession, userId) {
        const surrenderAction = {
            turn: battleSession.turn,
            actionType: "surrender",
            playerId: userId,
        };
        this.io.to(battleSession.id).emit("actions", [surrenderAction]);
    }

    /**
     * 
     * @param {BattleSession} battleSession
     */
    emitNextTurnAction(battleSession) {
        battleSession.turn++;
        battleSession.nextPlayerTurn();
        const nextTurnAction = {
            turn: battleSession.turn,
            actionType: "nextTurn",
            playerId: battleSession.currentTurnPlayerId, // using the current turn player's id
        };
        this.io.to(battleSession.id).emit("actions", [nextTurnAction]);
    }
}

module.exports = ActionEmitter;