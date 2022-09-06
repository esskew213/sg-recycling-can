System.register(["./drawable-objects/FallingObject", "./drawable-objects/Paddle", "./drawable-objects/Background", "./drawable-objects/Scorekeeper", "./drawable-objects/Items"], function (exports_1, context_1) {
    "use strict";
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
    var _Engine_backgroundImg, FallingObject_1, Paddle_1, Background_1, Scorekeeper_1, Items_1, Engine, GameService, gameService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (FallingObject_1_1) {
                FallingObject_1 = FallingObject_1_1;
            },
            function (Paddle_1_1) {
                Paddle_1 = Paddle_1_1;
            },
            function (Background_1_1) {
                Background_1 = Background_1_1;
            },
            function (Scorekeeper_1_1) {
                Scorekeeper_1 = Scorekeeper_1_1;
            },
            function (Items_1_1) {
                Items_1 = Items_1_1;
            }
        ],
        execute: function () {
            Engine = class Engine {
                constructor(element) {
                    this.fallingObjects = [];
                    _Engine_backgroundImg.set(this, void 0);
                    this.itemsToDraw = [];
                    const canvas = document.createElement('canvas');
                    canvas.width = GameService.WIDTH;
                    canvas.height = GameService.HEIGHT;
                    element.appendChild(canvas);
                    this.ctx = canvas.getContext('2d');
                }
                refreshScreen() {
                    this.ctx.clearRect(0, 0, GameService.WIDTH, GameService.HEIGHT);
                    this.itemsToDraw.forEach((item) => item.draw(this.ctx));
                    FallingObject_1.default.onScreen.forEach((item) => {
                        const boundUpdateStats = this.updateStats.bind(this);
                        item.update(this.paddle.x, boundUpdateStats);
                    });
                    this.generateFallingObject();
                    this.deleteOffscreenObjects();
                    console.log(this.scorekeeper.score);
                }
                startGame() {
                    __classPrivateFieldSet(this, _Engine_backgroundImg, new Background_1.default(), "f");
                    this.paddle = new Paddle_1.default();
                    this.scorekeeper = new Scorekeeper_1.default();
                    let interval = setInterval(() => this.refreshScreen(), 16.7);
                }
                generateFallingObject() {
                    function pickRandomObject(dictionary) {
                        const randomNumber = Math.random() * Math.floor(Object.keys(dictionary).length);
                        return Object.values(dictionary)[randomNumber];
                    }
                    if (FallingObject_1.default.onScreen.length < Engine.MAX_FALLING_OBJECTS) {
                        if (Math.random() < Engine.BONUS_LIFE_PROBABILITY) {
                        }
                        else if (Math.random() <
                            Engine.BONUS_LIFE_PROBABILITY + Engine.OBJECT_PROBABILITY) {
                            let newFallingObject;
                            if (Math.random() < Engine.RECYCLABLE_PROBABILITY) {
                                const { itemName, imageName, description, points, velocity } = pickRandomObject(Items_1.recyclableObjects);
                                newFallingObject = new Items_1.Recyclable(Math.random() * GameService.WIDTH, 0, velocity, imageName, itemName, description, points);
                            }
                            else {
                                const { itemName, imageName, description, lifePenalty, velocity } = pickRandomObject(Items_1.nonRecyclableObjects);
                                newFallingObject = new Items_1.NonRecyclable(Math.random() * GameService.WIDTH, 0, velocity, imageName, itemName, description, lifePenalty);
                            }
                            this.itemsToDraw.push(newFallingObject);
                            FallingObject_1.default.onScreen.push(newFallingObject);
                        }
                    }
                }
                deleteOffscreenObjects() {
                    FallingObject_1.default.onScreen = FallingObject_1.default.onScreen.filter((item) => item.isOnScreen);
                    this.itemsToDraw = [
                        __classPrivateFieldGet(this, _Engine_backgroundImg, "f"),
                        this.paddle,
                        this.scorekeeper,
                        ...FallingObject_1.default.onScreen,
                    ];
                }
                updateStats(typeOfStat, stat) {
                    if (typeOfStat === 'points') {
                        this.scorekeeper.addPoints(stat);
                    }
                    else {
                        console.log(stat, 'life penalty');
                    }
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
            };
            _Engine_backgroundImg = new WeakMap();
            Engine.MAX_FALLING_OBJECTS = 8;
            Engine.BONUS_LIFE_PROBABILITY = 0.01;
            Engine.OBJECT_PROBABILITY = 0.04;
            Engine.RECYCLABLE_PROBABILITY = 0.5;
            GameService = class GameService {
                constructor() {
                    this.gameState = 'notStarted';
                    const gameContainer = document.querySelector('.game-container');
                    this.engine = new Engine(gameContainer);
                    window.addEventListener('keydown', (e) => this.listenToKeypress(e));
                }
                listenToKeypress(e) {
                    if (e.key === 'Enter' && this.gameState === 'notStarted') {
                        this.gameState = 'started';
                        this.engine.startGame();
                    }
                    else if (e.key === 'ArrowRight' && this.gameState === 'started') {
                        this.engine.receiveArrowKey('right');
                    }
                    else if (e.key === 'ArrowLeft' && this.gameState === 'started') {
                        this.engine.receiveArrowKey('left');
                    }
                }
            };
            exports_1("default", GameService);
            GameService.WIDTH = 300;
            GameService.HEIGHT = 600;
            GameService.BACKGROUND_COLOUR = 'cornflowerblue';
            gameService = new GameService();
        }
    };
});
