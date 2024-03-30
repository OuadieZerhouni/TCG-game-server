/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */



class Room {
    static rooms = [];
    /**
     * 
     * @param {String} Id 
     * @param {String} player1_id 
     * @param {String} player2_id 
     * @param {Number} turn 
     * @param {Number} duration 
     * @param {Date} startDate 
     * @param {String} deck1 
     * @param {String} deck2 
     * @param {Number} blood1 
     * @param {Number} blood2 
     */
    constructor(Id, player1_id, player2_id, turn, duration, startDate, deck1, deck2, blood1, blood2) {
        this.Id         = Id;
        this.player1_id = player1_id;
        this.player2_id = player2_id;
        this.turn       = turn;
        this.duration   = duration;
        this.startDate  = startDate;
        this.deck1      = deck1;
        this.deck2      = deck2;
        this.hand1      = [];
        this.hand2      = [];
        this.field1     = [];
        this.field2     = [];
        this.blood1     = blood1;
        this.blood2     = blood2;
        Room.rooms.push(this);
    }
    

    /**
     * 
     * @param {String} Id 
     * @returns {Room} the room with the given Id
     */
    static findRoomById(Id) {
        return Room.rooms.find(room => room.Id === Id);
    }
}

module.exports = Room;