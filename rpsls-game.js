class RpslsGame {

    constructor(p1, p2) {
        //добавляет сокеты игроков в массив
        this.players = [p1, p2];
        //массив фиксирующий ходы игроков
        this.turns = [null, null];

        this.sendToPlayers('Камень, Ножницы, Бумага, Ящерица, Спок!');

        this.players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this.onTurn(idx, turn);
            });
        });
    }

    //отправляет сообщение выбранному игроку
    sendToPlayer(playerIndex, msg) {
        this.players[playerIndex].emit('message', msg);
    }

    //отправляет сообщения всем игрокам
    sendToPlayers(msg) {
        this.players.forEach(player => {
            player.emit('message', msg);
        });
    }

    //служит для перевода ходов на русский язык
    translate(turn) {
        switch (turn) {
            case 'rock' :
                return "камень";
                break;
            case 'paper' :
                return "бумага";
                break;
            case 'scissors' :
                return "ножницы";
                break;
            case 'lizard' :
                return "ящерица";
                break;
            case 'spock' :
                return "Спок";
                break;
            default :
                throw new Error();
        }
    }

    //фиксирует ход игрока, и запускает проверку сделал ли второй игрок ход
    onTurn(playerIndex, turn) {
        this.turns[playerIndex] = turn;
        this.sendToPlayer(playerIndex, `Ваш выбор ${this.translate(turn)}`);
        this.checkGameOver();
    }

    //если оба игрока походили, то показывает их выбор, а также кто победил
    checkGameOver() {
        const turns = this.turns;
        if (turns[0] && turns[1]) {
            this.sendToPlayers('Выбор игроков: ' + this.translate(turns[0]) + ' и ' + this.translate(turns[1]));
            this.players.forEach(player => {
                player.emit('show-result-img', turns);
            });
            this.getGameResult();
            this.turns = [null, null];
            this.sendToPlayers('Следующий раунд!');
            this.sendToPlayers('..........');
        }
    }

    //логика подсчета победителя
    getGameResult() {
        const p1 = this.decodeTurn(this.turns[0]);
        const p2 = this.decodeTurn(this.turns[1]);

        const distance = (p1 - p2 + 5) % 5;

        switch (distance) {
            case 0 :
                this.sendToPlayers('Ничья!');
                break;
            case 1 :
                this.sendWinMessage(this.players[0], this.players[1]);
                break;
            case 2 :
                this.sendWinMessage(this.players[1], this.players[0]);
                break;
            case 3 :
                this.sendWinMessage(this.players[0], this.players[1]);
                break;
            case 4 :
                this.sendWinMessage(this.players[1], this.players[0]);
                break;
            default:
                throw new Error();
        }
    }

    sendWinMessage(winner, loser) {
        winner.emit('message', 'Победа!');
        loser.emit('message', 'Поражение');
    }

    decodeTurn(turn) {
        switch (turn) {
            case 'rock':
                return 0;
            case 'paper':
                return 1;
            case 'scissors':
                return 2;
            case 'spock':
                return 3;
            case 'lizard':
                return 4;
            default:
                throw new Error(`Неизвестный ход ${turn}`);
        }
    }
}

module.exports = RpslsGame;