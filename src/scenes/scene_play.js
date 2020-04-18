import palettes from '../gameObjects/palettes.js';
var left_points = 0;
var right_points = 0;
class Scene_play extends Phaser.Scene {
	constructor() {
		super({key: 'Scene_play'});
	}
	create() {
		var center_width = this.sys.game.config.width/2;
		var center_height = this.sys.game.config.height/2;
		this.add.image(center_width, center_height, "separator");
		// Palettes	
		this.left = new palettes(this, 25, center_height, 'left_pallete');
		this.right = new palettes(this, this.sys.game.config.width-25, center_height, 'right_pallete');
		
		// Ball
		this.physics.world.setBoundsCollision(false, false, true, true);
		this.ball = this.physics.add.image(center_width, center_height, 'ball');
		this.ball.setCollideWorldBounds(true);
		this.ball.setBounce(1);
		this.ball.setVelocityX(-280);

		// Physics
		this.physics.add.collider(this.ball, this.left, this.collision, null, this);
		this.physics.add.collider(this.ball, this.right, this.collision, null, this);

		// Controls
		this.cursor = this.input.keyboard.createCursorKeys();

		// Left pallete
		this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	} 
	update(time, delta) {
		if (this.ball.x < 0) {
			this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
			left_points++;
			console.log("Left: " + left_points);
		} else if (this.ball.x > this.sys.game.config.width) {
			this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
			right_points++;
			console.log("Right: " + right_points);
		}

		// Control palettes
		if (this.cursor.down.isDown) {
			this.right.body.setVelocityY(315);
		} else if (this.cursor.up.isDown) {
			this.right.body.setVelocityY(-315);
		} else {
			this.right.body.setVelocityY(0);
		}
		if (this.cursor_S.isDown) {
			this.left.body.setVelocityY(315);
		} else if (this.cursor_W.isDown) {
			this.left.body.setVelocityY(-315);
		} else {
			this.left.body.setVelocityY(0);
		}
	}
	collision () {
		this.ball.setVelocityY(Phaser.Math.Between(-120, 120)); 
	}
}
export default Scene_play;