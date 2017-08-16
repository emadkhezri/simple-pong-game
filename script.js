
        var WIDTH = 700, HEIGHT = 600, pi = Math.PI;
        var canvas, ctx, keyState;
        var player, ai, ball;
        var upArrow = 38, downArraow = 40;

        player = {
            x: null,
            y: null,
            width: 20,
            height: 100,

            update: function () {
                if (keyState[downArraow]) this.y += 7;
                if (keyState[upArrow]) this.y -= 7;
            },
            draw: function () {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };

        ai = {
            x: null,
            y: null,
            width: 20,
            height: 100,

            update: function () { },
            draw: function () {
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };

        ball = {
            x: null,
            y: null,
            vel: null,
            side: 20,
            speed: 5,

            update: function () {
                this.x += this.vel.x;
                this.y += this.vel.y;
                if (this.y < 0 || this.y +this.side> HEIGHT) {
                    this.vel.y *= -1;
                }
            },
            draw: function () {
                ctx.fillRect(this.x, this.y, this.side, this.side);
            }
        };

        function main() {
            canvas = document.createElement("canvas");
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            ctx = canvas.getContext("2d");
            document.body.appendChild(canvas);
            
            keyState = {};
            document.addEventListener("keydown", function (evt) {
                keyState[evt.keyCode] = true;
            });
            document.addEventListener("keyup", function (evt) {
                delete keyState[evt.keyCode];
            });

            init();
            var loop = function () {
                update();
                draw();
                window.requestAnimationFrame(loop, canvas);
            }


            window.requestAnimationFrame(loop, canvas);
        }

        function init() {
            player.x = player.width;
            player.w = (HEIGHT - player.height) / 2;

            ai.x = WIDTH - (player.width + ai.width);
            ai.y = (HEIGHT - ai.height) / 2;

            ball.x = (WIDTH - ball.side) / 2;
            ball.y = (HEIGHT - ball.side) / 2;

            ball.vel = {
                x: 0,
                y: ball.speed
            }
        }

        function update() {
            ball.update();
            player.update();
            ai.update();
        }

        function draw() {
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            ctx.save();
            ctx.fillStyle = "#fff";

            ball.draw();
            player.draw();
            ai.draw();

            var w = 4;
            var x = (WIDTH - w) * 0.5;
            var y = 0;
            var step = HEIGHT / 20;
            while (y < HEIGHT) {
                ctx.fillRect(x, y + step * 0.25, w, step * 0.5);
                y += step;
            }



            ctx.restore();
        }

        main();
