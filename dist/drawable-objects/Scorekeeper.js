System.register(["./ObjectOnScreen"], function (exports_1, context_1) {
    "use strict";
    var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };
    var _Scorekeeper_score, _Scorekeeper_x, _Scorekeeper_y, ObjectOnScreen_1, Scorekeeper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ObjectOnScreen_1_1) {
                ObjectOnScreen_1 = ObjectOnScreen_1_1;
            }
        ],
        execute: function () {
            Scorekeeper = class Scorekeeper extends ObjectOnScreen_1.default {
                constructor() {
                    super(...arguments);
                    _Scorekeeper_score.set(this, 0);
                    _Scorekeeper_x.set(this, 10);
                    _Scorekeeper_y.set(this, 30);
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
                    ctx.font = '24px Courier New';
                    ctx.fillStyle = 'white';
                    ctx.fillText(this.score.toString(), __classPrivateFieldGet(this, _Scorekeeper_x, "f"), __classPrivateFieldGet(this, _Scorekeeper_y, "f"));
                }
            };
            exports_1("default", Scorekeeper);
            _Scorekeeper_score = new WeakMap(), _Scorekeeper_x = new WeakMap(), _Scorekeeper_y = new WeakMap();
        }
    };
});
