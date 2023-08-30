var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
System.register("drawable-objects/ObjectOnScreen", [], function (exports_1, context_1) {
    "use strict";
    var ObjectOnScreen;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ObjectOnScreen = class ObjectOnScreen {
            };
            exports_1("default", ObjectOnScreen);
        }
    };
});
System.register("drawable-objects/Paddle", ["drawable-objects/ObjectOnScreen", "index"], function (exports_2, context_2) {
    "use strict";
    var _Paddle_x, _Paddle_y, _Paddle_img, ObjectOnScreen_1, index_1, Paddle;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (ObjectOnScreen_1_1) {
                ObjectOnScreen_1 = ObjectOnScreen_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            Paddle = class Paddle extends ObjectOnScreen_1.default {
                constructor() {
                    super();
                    _Paddle_x.set(this, void 0);
                    _Paddle_y.set(this, void 0);
                    _Paddle_img.set(this, void 0);
                    __classPrivateFieldSet(this, _Paddle_img, document.createElement('img'), "f");
                    __classPrivateFieldGet(this, _Paddle_img, "f").src = 'dist/images/blueBin.png';
                    console.log('paddle drawn');
                    __classPrivateFieldSet(this, _Paddle_x, 0, "f");
                    __classPrivateFieldSet(this, _Paddle_y, 0, "f");
                    __classPrivateFieldGet(this, _Paddle_img, "f").onload = () => {
                        __classPrivateFieldSet(this, _Paddle_x, (index_1.default.WIDTH - __classPrivateFieldGet(this, _Paddle_img, "f").width) / 2, "f");
                        __classPrivateFieldSet(this, _Paddle_y, index_1.default.HEIGHT - __classPrivateFieldGet(this, _Paddle_img, "f").height, "f");
                    };
                    __classPrivateFieldGet(this, _Paddle_img, "f").onerror = (e) => {
                        throw new Error(`${e}`);
                    };
                }
                get x() {
                    return __classPrivateFieldGet(this, _Paddle_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _Paddle_y, "f");
                }
                get width() {
                    return __classPrivateFieldGet(this, _Paddle_img, "f").width;
                }
                get height() {
                    return __classPrivateFieldGet(this, _Paddle_img, "f").height;
                }
                draw(ctx) {
                    ctx.drawImage(__classPrivateFieldGet(this, _Paddle_img, "f"), __classPrivateFieldGet(this, _Paddle_x, "f"), __classPrivateFieldGet(this, _Paddle_y, "f"));
                }
                move(direction) {
                    if (direction === 'left') {
                        __classPrivateFieldSet(this, _Paddle_x, __classPrivateFieldGet(this, _Paddle_x, "f") - Paddle.SPEED, "f");
                    }
                    else if (direction === 'right') {
                        __classPrivateFieldSet(this, _Paddle_x, __classPrivateFieldGet(this, _Paddle_x, "f") + Paddle.SPEED, "f");
                    }
                }
            };
            exports_2("default", Paddle);
            _Paddle_x = new WeakMap(), _Paddle_y = new WeakMap(), _Paddle_img = new WeakMap();
            Paddle.SPEED = 15;
        }
    };
});
System.register("drawable-objects/FallingObject", ["index", "drawable-objects/ObjectOnScreen"], function (exports_3, context_3) {
    "use strict";
    var _FallingObject_x, _FallingObject_y, _FallingObject_img, _FallingObject_velocity, _FallingObject_itemName, _FallingObject_description, _ExtraLife_lifeBonus, index_2, ObjectOnScreen_2, FallingObject, ExtraLife;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (ObjectOnScreen_2_1) {
                ObjectOnScreen_2 = ObjectOnScreen_2_1;
            }
        ],
        execute: function () {
            FallingObject = class FallingObject extends ObjectOnScreen_2.default {
                constructor(x, y, velocityMultiplier, velocity, imageName, itemName, description) {
                    super();
                    _FallingObject_x.set(this, void 0);
                    _FallingObject_y.set(this, void 0);
                    _FallingObject_img.set(this, void 0);
                    this.hasCollided = false;
                    this.isOnScreen = true;
                    this.velocityMultiplier = 1;
                    _FallingObject_velocity.set(this, void 0);
                    _FallingObject_itemName.set(this, void 0);
                    _FallingObject_description.set(this, void 0);
                    __classPrivateFieldSet(this, _FallingObject_x, x, "f");
                    __classPrivateFieldSet(this, _FallingObject_y, y, "f");
                    __classPrivateFieldSet(this, _FallingObject_velocity, velocity * velocityMultiplier, "f");
                    __classPrivateFieldSet(this, _FallingObject_itemName, itemName, "f");
                    __classPrivateFieldSet(this, _FallingObject_description, description, "f");
                    __classPrivateFieldSet(this, _FallingObject_img, document.createElement('img'), "f");
                    __classPrivateFieldGet(this, _FallingObject_img, "f").src = `dist/images/${imageName}`;
                }
                get x() {
                    return __classPrivateFieldGet(this, _FallingObject_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _FallingObject_y, "f");
                }
                get velocity() {
                    return __classPrivateFieldGet(this, _FallingObject_velocity, "f");
                }
                draw(ctx) {
                    ctx.drawImage(__classPrivateFieldGet(this, _FallingObject_img, "f"), __classPrivateFieldGet(this, _FallingObject_x, "f"), __classPrivateFieldGet(this, _FallingObject_y, "f"));
                }
                move() {
                    __classPrivateFieldSet(this, _FallingObject_y, __classPrivateFieldGet(this, _FallingObject_y, "f") + __classPrivateFieldGet(this, _FallingObject_velocity, "f"), "f");
                }
                updateOnscreenState() {
                    if (__classPrivateFieldGet(this, _FallingObject_y, "f") > index_2.default.HEIGHT) {
                        this.isOnScreen = false;
                    }
                }
                updateCollisionState(startX, paddleWidth, paddleHeight) {
                    this.hasCollided =
                        __classPrivateFieldGet(this, _FallingObject_x, "f") + __classPrivateFieldGet(this, _FallingObject_img, "f").width > startX &&
                            __classPrivateFieldGet(this, _FallingObject_x, "f") < startX + paddleWidth &&
                            __classPrivateFieldGet(this, _FallingObject_y, "f") + __classPrivateFieldGet(this, _FallingObject_img, "f").height > index_2.default.HEIGHT - paddleHeight &&
                            __classPrivateFieldGet(this, _FallingObject_y, "f") < index_2.default.HEIGHT;
                    this.isOnScreen = !this.hasCollided;
                }
                update(startX, paddleWidth, paddleHeight, updatePlayerStats) {
                    this.move();
                    this.updateCollisionState(startX, paddleWidth, paddleHeight);
                    this.updateOnscreenState();
                    if (this.hasCollided) {
                        this.collisionEffect(updatePlayerStats);
                    }
                }
            };
            exports_3("default", FallingObject);
            _FallingObject_x = new WeakMap(), _FallingObject_y = new WeakMap(), _FallingObject_img = new WeakMap(), _FallingObject_velocity = new WeakMap(), _FallingObject_itemName = new WeakMap(), _FallingObject_description = new WeakMap();
            FallingObject.IMAGE_EXTENSION = 'dist/images/';
            FallingObject.onScreen = [];
            ExtraLife = class ExtraLife extends FallingObject {
                constructor(x, y, velocityMultiplier) {
                    super(x, y, velocityMultiplier, ExtraLife.VELOCITY, ExtraLife.IMAGE_NAME, ExtraLife.ITEM_NAME, ExtraLife.ITEM_DESCRIPTION);
                    _ExtraLife_lifeBonus.set(this, 1);
                }
                collisionEffect(updatePlayerStats) {
                    updatePlayerStats('lives', __classPrivateFieldGet(this, _ExtraLife_lifeBonus, "f"));
                }
            };
            exports_3("ExtraLife", ExtraLife);
            _ExtraLife_lifeBonus = new WeakMap();
            ExtraLife.VELOCITY = 3;
            ExtraLife.IMAGE_NAME = 'life.png';
            ExtraLife.ITEM_NAME = 'Bonus life';
            ExtraLife.ITEM_DESCRIPTION = 'An extra life for you!';
        }
    };
});
System.register("drawable-objects/Background", ["drawable-objects/ObjectOnScreen"], function (exports_4, context_4) {
    "use strict";
    var _Background_x, _Background_y, _Background_img, ObjectOnScreen_3, Background;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (ObjectOnScreen_3_1) {
                ObjectOnScreen_3 = ObjectOnScreen_3_1;
            }
        ],
        execute: function () {
            Background = class Background extends ObjectOnScreen_3.default {
                constructor() {
                    super();
                    _Background_x.set(this, 0);
                    _Background_y.set(this, 0);
                    _Background_img.set(this, void 0);
                    __classPrivateFieldSet(this, _Background_img, document.createElement('img'), "f");
                    __classPrivateFieldGet(this, _Background_img, "f").src = 'dist/images/background.png';
                }
                get x() {
                    return __classPrivateFieldGet(this, _Background_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _Background_y, "f");
                }
                draw(ctx) {
                    ctx.save();
                    ctx.globalAlpha = 0.3;
                    ctx.drawImage(__classPrivateFieldGet(this, _Background_img, "f"), __classPrivateFieldGet(this, _Background_x, "f"), __classPrivateFieldGet(this, _Background_y, "f"));
                    ctx.restore();
                }
            };
            exports_4("default", Background);
            _Background_x = new WeakMap(), _Background_y = new WeakMap(), _Background_img = new WeakMap();
        }
    };
});
System.register("drawable-objects/Scorekeeper", ["drawable-objects/ObjectOnScreen"], function (exports_5, context_5) {
    "use strict";
    var _Scorekeeper_score, _Scorekeeper_x, _Scorekeeper_y, ObjectOnScreen_4, Scorekeeper;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (ObjectOnScreen_4_1) {
                ObjectOnScreen_4 = ObjectOnScreen_4_1;
            }
        ],
        execute: function () {
            Scorekeeper = class Scorekeeper extends ObjectOnScreen_4.default {
                constructor() {
                    super(...arguments);
                    _Scorekeeper_score.set(this, 0);
                    _Scorekeeper_x.set(this, 20);
                    _Scorekeeper_y.set(this, 35);
                }
                get score() {
                    return __classPrivateFieldGet(this, _Scorekeeper_score, "f");
                }
                get x() {
                    return __classPrivateFieldGet(this, _Scorekeeper_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _Scorekeeper_y, "f");
                }
                addPoints(points) {
                    __classPrivateFieldSet(this, _Scorekeeper_score, __classPrivateFieldGet(this, _Scorekeeper_score, "f") + points, "f");
                }
                draw(ctx) {
                    ctx.font = 'bold 28px Courier New';
                    ctx.fillStyle = 'white';
                    ctx.fillText(this.score.toString(), __classPrivateFieldGet(this, _Scorekeeper_x, "f"), __classPrivateFieldGet(this, _Scorekeeper_y, "f"));
                }
            };
            exports_5("default", Scorekeeper);
            _Scorekeeper_score = new WeakMap(), _Scorekeeper_x = new WeakMap(), _Scorekeeper_y = new WeakMap();
        }
    };
});
System.register("drawable-objects/Items", ["drawable-objects/FallingObject"], function (exports_6, context_6) {
    "use strict";
    var _Recyclable_points, _NonRecyclable_lifePenalty, FallingObject_1, Recyclable, NonRecyclable, recyclableObjects, nonRecyclableObjects;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (FallingObject_1_1) {
                FallingObject_1 = FallingObject_1_1;
            }
        ],
        execute: function () {
            Recyclable = class Recyclable extends FallingObject_1.default {
                constructor(x, y, velocityMultiplier, velocity, imageName, itemName, description, points) {
                    super(x, y, velocityMultiplier, velocity, imageName, itemName, description);
                    _Recyclable_points.set(this, void 0);
                    __classPrivateFieldSet(this, _Recyclable_points, points, "f");
                }
                collisionEffect(updatePlayerStats) {
                    updatePlayerStats('points', __classPrivateFieldGet(this, _Recyclable_points, "f"));
                }
            };
            exports_6("Recyclable", Recyclable);
            _Recyclable_points = new WeakMap();
            NonRecyclable = class NonRecyclable extends FallingObject_1.default {
                constructor(x, y, velocityMultiplier, velocity, imageName, itemName, description, lifePenalty) {
                    super(x, y, velocityMultiplier, velocity, imageName, itemName, description);
                    _NonRecyclable_lifePenalty.set(this, void 0);
                    __classPrivateFieldSet(this, _NonRecyclable_lifePenalty, lifePenalty, "f");
                }
                collisionEffect(updatePlayerStats) {
                    updatePlayerStats('lives', __classPrivateFieldGet(this, _NonRecyclable_lifePenalty, "f"));
                }
            };
            exports_6("NonRecyclable", NonRecyclable);
            _NonRecyclable_lifePenalty = new WeakMap();
            exports_6("recyclableObjects", recyclableObjects = {
                recyclable001: {
                    itemName: 'Glass bottle',
                    imageName: 'glassBottle.png',
                    description: 'Clean glass bottles can be recycled.',
                    points: 1,
                    velocity: 2,
                },
                recyclable002: {
                    itemName: 'Red packet',
                    imageName: 'redPacket.png',
                    description: 'Red packets can be recycled!',
                    points: 1,
                    velocity: 2,
                },
                recyclable003: {
                    itemName: 'Plastic bottle',
                    imageName: 'plasticBottle.png',
                    description: 'Plastic bottles can be recycled.',
                    points: 1,
                    velocity: 2,
                },
            });
            exports_6("nonRecyclableObjects", nonRecyclableObjects = {
                nonrecyclable001: {
                    itemName: 'Crisps bag',
                    imageName: 'crispsBag.png',
                    description: "Foil-lined bags can't be recycled!",
                    lifePenalty: -1,
                    velocity: 2,
                },
                nonrecyclable002: {
                    itemName: 'Shoes',
                    imageName: 'shoes.png',
                    description: "Your kicks can't be recycled!",
                    lifePenalty: -1,
                    velocity: 2,
                },
                nonrecyclable003: {
                    itemName: 'Pyrex',
                    imageName: 'pyrex.png',
                    description: "Pyrex containers can't be recycled. :0",
                    lifePenalty: -1,
                    velocity: 2,
                },
                nonrecyclable004: {
                    itemName: 'Tissue',
                    imageName: 'tissue.png',
                    description: "Tissues can't be recycled! Eww!",
                    lifePenalty: -1,
                    velocity: 2,
                },
            });
        }
    };
});
System.register("gameOverScreen", [], function (exports_7, context_7) {
    "use strict";
    var GameOverScreen;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            GameOverScreen = class GameOverScreen {
                constructor(element) {
                    this.gameOverScreen = document.createElement('div');
                    this.gameOverScreen.classList.add('gameOver');
                    this.gameOverScreen.classList.toggle('gameOver--hidden');
                    element.appendChild(this.gameOverScreen);
                }
                displayGameOver(score) {
                    this.gameOverScreen.innerHTML = `GAME OVER!<br />YOUR SCORE: ${score}<br /><br />Think you can recycle better?<br />Press Enter to play again.`;
                    this.gameOverScreen.classList.toggle('gameOver--hidden');
                }
            };
            exports_7("default", GameOverScreen);
        }
    };
});
System.register("drawable-objects/Lifekeeper", ["drawable-objects/ObjectOnScreen", "index"], function (exports_8, context_8) {
    "use strict";
    var _Lifekeeper_lives, _Lifekeeper_x, _Lifekeeper_y, _Lifekeeper_img, ObjectOnScreen_5, index_3, Lifekeeper;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (ObjectOnScreen_5_1) {
                ObjectOnScreen_5 = ObjectOnScreen_5_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            Lifekeeper = class Lifekeeper extends ObjectOnScreen_5.default {
                constructor() {
                    super();
                    _Lifekeeper_lives.set(this, 3);
                    _Lifekeeper_x.set(this, index_3.default.WIDTH - 40);
                    _Lifekeeper_y.set(this, 10);
                    _Lifekeeper_img.set(this, void 0);
                    __classPrivateFieldSet(this, _Lifekeeper_img, document.createElement('img'), "f");
                    __classPrivateFieldGet(this, _Lifekeeper_img, "f").src = `dist/images/life.png`;
                }
                get lives() {
                    return __classPrivateFieldGet(this, _Lifekeeper_lives, "f");
                }
                get x() {
                    return __classPrivateFieldGet(this, _Lifekeeper_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _Lifekeeper_y, "f");
                }
                addLives(lifeBonus) {
                    const newNumberOfLives = __classPrivateFieldGet(this, _Lifekeeper_lives, "f") + lifeBonus;
                    __classPrivateFieldSet(this, _Lifekeeper_lives, Math.min(Lifekeeper.MAX_LIVES, newNumberOfLives), "f");
                    if (newNumberOfLives === 0) {
                        // document.location.reload();
                    }
                }
                draw(ctx) {
                    for (let i = 0; i < __classPrivateFieldGet(this, _Lifekeeper_lives, "f"); i++) {
                        ctx.drawImage(__classPrivateFieldGet(this, _Lifekeeper_img, "f"), __classPrivateFieldGet(this, _Lifekeeper_x, "f") - (__classPrivateFieldGet(this, _Lifekeeper_img, "f").width + 10) * i, __classPrivateFieldGet(this, _Lifekeeper_y, "f"));
                    }
                }
            };
            exports_8("default", Lifekeeper);
            _Lifekeeper_lives = new WeakMap(), _Lifekeeper_x = new WeakMap(), _Lifekeeper_y = new WeakMap(), _Lifekeeper_img = new WeakMap();
            Lifekeeper.MAX_LIVES = 3;
        }
    };
});
System.register("index", ["drawable-objects/FallingObject", "drawable-objects/Background", "drawable-objects/Paddle", "drawable-objects/Scorekeeper", "gameOverScreen", "drawable-objects/Items", "drawable-objects/Lifekeeper", "Menu"], function (exports_9, context_9) {
    "use strict";
    var _Engine_backgroundImg, FallingObject_2, Background_1, Paddle_1, Scorekeeper_1, gameOverScreen_1, Items_1, FallingObject_3, Lifekeeper_1, Menu_1, Engine, GameService, gameService;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (FallingObject_2_1) {
                FallingObject_2 = FallingObject_2_1;
                FallingObject_3 = FallingObject_2_1;
            },
            function (Background_1_1) {
                Background_1 = Background_1_1;
            },
            function (Paddle_1_1) {
                Paddle_1 = Paddle_1_1;
            },
            function (Scorekeeper_1_1) {
                Scorekeeper_1 = Scorekeeper_1_1;
            },
            function (gameOverScreen_1_1) {
                gameOverScreen_1 = gameOverScreen_1_1;
            },
            function (Items_1_1) {
                Items_1 = Items_1_1;
            },
            function (Lifekeeper_1_1) {
                Lifekeeper_1 = Lifekeeper_1_1;
            },
            function (Menu_1_1) {
                Menu_1 = Menu_1_1;
            }
        ],
        execute: function () {
            Engine = class Engine {
                constructor(element) {
                    this.fallingObjects = [];
                    _Engine_backgroundImg.set(this, void 0);
                    this.itemsToDraw = [];
                    this.avgTimeBetweenGenerations = 3;
                    this.maxObjectsOnScreen = 5;
                    this.velocityMultiplier = 1;
                    const canvas = document.createElement('canvas');
                    canvas.width = GameService.WIDTH;
                    canvas.height = GameService.HEIGHT;
                    element.appendChild(canvas);
                    this.ctx = canvas.getContext('2d');
                    this.gameOverScreen = new gameOverScreen_1.default(element);
                }
                refreshScreen() {
                    this.ctx.clearRect(0, 0, GameService.WIDTH, GameService.HEIGHT);
                    this.itemsToDraw.forEach((item) => item.draw(this.ctx));
                    FallingObject_2.default.onScreen.forEach((item) => {
                        const boundUpdateStats = this.updateStats.bind(this);
                        item.update(this.paddle.x, this.paddle.width, this.paddle.height, boundUpdateStats);
                        console.log(item.velocity);
                    });
                    this.generateFallingObject();
                    this.deleteOffscreenObjects();
                }
                startGame() {
                    __classPrivateFieldSet(this, _Engine_backgroundImg, new Background_1.default(), "f");
                    this.paddle = new Paddle_1.default();
                    this.scorekeeper = new Scorekeeper_1.default();
                    this.lifekeeper = new Lifekeeper_1.default();
                    this.interval = setInterval(() => this.refreshScreen(), 1000 / 60);
                    GameService.GAME_STATE = 'started';
                }
                selectRandomObject() {
                    function pickRandomObjectFromList(dictionary) {
                        const randomNumber = Math.floor(Math.random() * Object.keys(dictionary).length);
                        return Object.values(dictionary)[randomNumber];
                    }
                    const randomNumber = Math.random();
                    if (randomNumber < Engine.BONUS_LIFE_PROBABILITY_CUTOFF) {
                        return new FallingObject_3.ExtraLife(Math.random() * GameService.WIDTH, 0, this.velocityMultiplier);
                    }
                    else if (randomNumber < Engine.RECYCLABLE_PROBABILITY_CUTOFF) {
                        const { itemName, imageName, description, points, velocity } = pickRandomObjectFromList(Items_1.recyclableObjects);
                        return new Items_1.Recyclable(Math.random() * GameService.WIDTH, 0, this.velocityMultiplier, velocity, imageName, itemName, description, points);
                    }
                    else {
                        const { itemName, imageName, description, lifePenalty, velocity } = pickRandomObjectFromList(Items_1.nonRecyclableObjects);
                        return new Items_1.NonRecyclable(Math.random() * GameService.WIDTH, 0, this.velocityMultiplier, velocity, imageName, itemName, description, lifePenalty);
                    }
                }
                generateFallingObject() {
                    if (this.timeItemLastGenerated === undefined) {
                        this.timeItemLastGenerated = Date.now();
                        const randomObject = this.selectRandomObject();
                        this.itemsToDraw.push(randomObject);
                        FallingObject_2.default.onScreen.push(randomObject);
                    }
                    else {
                        const currentTime = Date.now();
                        const timeDifferenceInSeconds = (currentTime - this.timeItemLastGenerated) / 1000;
                        let sumOfVelocities = 0;
                        for (let item of FallingObject_2.default.onScreen) {
                            sumOfVelocities += item.velocity * 60;
                        }
                        const avgVelocity = sumOfVelocities / FallingObject_2.default.onScreen.length;
                        const avgTimeToFall = GameService.HEIGHT / avgVelocity;
                        const intervalToGenerate = avgTimeToFall / this.maxObjectsOnScreen;
                        if (timeDifferenceInSeconds > intervalToGenerate) {
                            const randomObject = this.selectRandomObject();
                            this.itemsToDraw.push(randomObject);
                            FallingObject_2.default.onScreen.push(randomObject);
                            this.timeItemLastGenerated = currentTime;
                        }
                    }
                }
                deleteOffscreenObjects() {
                    FallingObject_2.default.onScreen = FallingObject_2.default.onScreen.filter((item) => item.isOnScreen);
                    this.itemsToDraw = [
                        __classPrivateFieldGet(this, _Engine_backgroundImg, "f"),
                        this.paddle,
                        this.scorekeeper,
                        this.lifekeeper,
                        ...FallingObject_2.default.onScreen,
                    ];
                }
                updateStats(typeOfStat, stat) {
                    if (typeOfStat === 'points') {
                        this.scorekeeper.addPoints(stat);
                        if (this.scorekeeper.score in Engine.SCORE_TO_MULTIPLIER_MAP) {
                            this.increaseObjectSpeeds(Engine.SCORE_TO_MULTIPLIER_MAP[this.scorekeeper.score]);
                        }
                    }
                    else {
                        this.lifekeeper.addLives(stat);
                    }
                    if (this.lifekeeper.lives === 0) {
                        this.gameOver(this.scorekeeper.score);
                    }
                }
                increaseObjectSpeeds(multiplier) {
                    this.velocityMultiplier = multiplier;
                }
                receiveArrowKey(direction) {
                    if (this.paddle !== undefined) {
                        if (direction === 'left') {
                            this.paddle.move('left');
                        }
                        else {
                            this.paddle.move('right');
                        }
                    }
                }
                pauseAndResume(action) {
                    if (GameService.GAME_STATE !== 'gameOver') {
                        if (action === 'pause') {
                            GameService.GAME_STATE = 'paused';
                            clearInterval(this.interval);
                            // this.ctx.clearRect(0, 0, GameService.WIDTH, GameService.HEIGHT);
                        }
                        else if (action === 'resume') {
                            GameService.GAME_STATE = 'started';
                            this.interval = setInterval(() => this.refreshScreen(), 1000 / 60);
                        }
                    }
                }
                gameOver(score) {
                    GameService.GAME_STATE = 'gameOver';
                    this.gameOverScreen.displayGameOver(score);
                    clearInterval(this.interval);
                }
            };
            _Engine_backgroundImg = new WeakMap();
            Engine.BONUS_LIFE_PROBABILITY_CUTOFF = 0.04;
            Engine.RECYCLABLE_PROBABILITY_CUTOFF = 0.52;
            Engine.NONRECYCLABLE_PROBABILITY_CUTOFF = 1;
            Engine.SCORE_TO_MULTIPLIER_MAP = {
                '2': 1.5,
                '3': 2,
                '5': 3,
            };
            GameService = class GameService {
                constructor() {
                    const gameContainer = document.querySelector('.game-container');
                    this.engine = new Engine(gameContainer);
                    this.menu = new Menu_1.default(gameContainer);
                    window.addEventListener('keydown', (e) => this.listenToKeypress(e));
                }
                listenToKeypress(e) {
                    if (e.key === 'Enter' && GameService.GAME_STATE === 'notStarted') {
                        GameService.GAME_STATE = 'started';
                        this.menu.receiveAction('toggle');
                        this.engine.startGame();
                    }
                    else if (e.key === 'ArrowRight' && GameService.GAME_STATE === 'started') {
                        this.engine.receiveArrowKey('right');
                    }
                    else if (e.key === 'ArrowLeft' && GameService.GAME_STATE === 'started') {
                        this.engine.receiveArrowKey('left');
                    }
                    else if (e.key === 'Enter' && GameService.GAME_STATE === 'started') {
                        GameService.GAME_STATE = 'paused';
                        this.menu.receiveAction('toggle');
                        this.engine.pauseAndResume('pause');
                    }
                    else if (e.key === 'Enter' && GameService.GAME_STATE === 'paused') {
                        GameService.GAME_STATE = 'started';
                        this.menu.receiveAction('toggle');
                        this.engine.pauseAndResume('resume');
                    }
                    else if (e.key === 'Enter' && GameService.GAME_STATE === 'gameOver') {
                        console.log(GameService.GAME_STATE);
                        document.location.reload();
                    }
                }
            };
            exports_9("default", GameService);
            GameService.WIDTH = 600;
            GameService.HEIGHT = 600;
            GameService.BACKGROUND_COLOUR = 'cornflowerblue';
            GameService.GAME_STATE = 'notStarted';
            gameService = new GameService();
        }
    };
});
System.register("Menu", ["drawable-objects/Items"], function (exports_10, context_10) {
    "use strict";
    var Items_2, Menu;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (Items_2_1) {
                Items_2 = Items_2_1;
            }
        ],
        execute: function () {
            Menu = class Menu {
                constructor(element) {
                    this.menu = document.createElement('div');
                    this.menu.classList.add('menu');
                    this.menu.innerHTML = 'PRESS ENTER TO START AND STOP THE GAME<br /><br />';
                    const recyclableItems = Object.values(Items_2.recyclableObjects).map((item) => {
                        return {
                            itemName: item.itemName,
                            imageName: item.imageName,
                            description: item.description,
                        };
                    });
                    const nonRecyclableItems = Object.values(Items_2.nonRecyclableObjects).map((item) => {
                        return {
                            itemName: item.itemName,
                            imageName: item.imageName,
                            description: item.description,
                        };
                    });
                    this.allItems = recyclableItems.concat(nonRecyclableItems);
                    const listOfItems = document.createElement('ul');
                    this.allItems.forEach((item) => {
                        const li = document.createElement('li');
                        li.innerHTML = `<img src="dist/images/${item.imageName}" class='inline-block pr-2 mb-2'/>${item.itemName}: ${item.description}`;
                        listOfItems.appendChild(li);
                    });
                    this.menu.appendChild(listOfItems);
                    element.appendChild(this.menu);
                }
                receiveAction(keypress) {
                    this.menu.classList.toggle('menu--hidden');
                }
            };
            exports_10("default", Menu);
        }
    };
});
