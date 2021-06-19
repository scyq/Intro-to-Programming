/**
 * To-do
 * 
 * basic:
 * 1. three levels
 * 2. eat all coins to win
 * 3. touch red to die
 * 4. time record
 * 
 * bonus:
 * 1. create pull request on GitHub
 * 2. deploy on GitHub Page
 */



const level0 = [
    'xxxxxxxxxxxxxxxxxxxxxx',
    '!         !          x',
    '!                 o  x',
    '!         o          x',
    '!                    x',
    '!     o   !    x     x',
    'xxxxxxxxxxxxxxxx!!!!!x',
];

const level1 = [

];

const level2 = [

];

const block_width = 50;
const x_offset = 30;
const y_offset = 30;

function parse_level(level_config, game) {
    for (let i = 0; i < level_config.length; i++) {
        for (let j = 0; j < level_config[i].length; j++) {
            // Create a wall and add it to the 'walls' group
            if (level_config[i][j] == 'x') {
                game.walls.create(x_offset + block_width * j, y_offset + block_width * i, 'blue');
            }

            // Create a coin and add it to the 'coins' group
            else if (level_config[i][j] == 'o') {
                game.coins.create(x_offset + block_width * j, y_offset + block_width * i, 'yellow');
            }

            // Create a enemy and add it to the 'enemies' group
            else if (level_config[i][j] == '!') {
                game.enemies.create(x_offset + block_width * j, y_offset + block_width * i, 'red');
            }
        }
    }
}


function preload() {
    this.load.image('blue', 'assets/blue.png');
    this.load.image('green', 'assets/green.png');
    this.load.image('red', 'assets/red.png');
    this.load.image('white', 'assets/white.png');
    this.load.image('yellow', 'assets/yellow.png');
}

function create() {

    this.walls = this.physics.add.staticGroup();
    this.coins = this.add.group();
    this.enemies = this.add.group();
    parse_level(level0, this);
    this.player = this.physics.add.sprite(2 * block_width + x_offset, 5 * block_width + y_offset - 10, "white");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.walls);
}

// run per frame
// 60FPS
// 1000 / 60 = 16.66667ms
function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    }
    else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    }
    else {
        this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-530);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 400,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);

