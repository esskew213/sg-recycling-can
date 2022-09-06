System.register(["./ObjectOnScreen"], function (exports_1, context_1) {
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
    var _Background_x, _Background_y, _Background_img, ObjectOnScreen_1, Background;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ObjectOnScreen_1_1) {
                ObjectOnScreen_1 = ObjectOnScreen_1_1;
            }
        ],
        execute: function () {
            Background = class Background extends ObjectOnScreen_1.default {
                constructor() {
                    super();
                    _Background_x.set(this, 0);
                    _Background_y.set(this, 0);
                    _Background_img.set(this, void 0);
                    __classPrivateFieldSet(this, _Background_img, document.createElement('img'), "f");
                    __classPrivateFieldGet(this, _Background_img, "f").src = 'images/background.png';
                }
                get x() {
                    return __classPrivateFieldGet(this, _Background_x, "f");
                }
                get y() {
                    return __classPrivateFieldGet(this, _Background_y, "f");
                }
                draw(ctx) {
                    ctx.drawImage(__classPrivateFieldGet(this, _Background_img, "f"), __classPrivateFieldGet(this, _Background_x, "f"), __classPrivateFieldGet(this, _Background_y, "f"));
                }
            };
            exports_1("default", Background);
            _Background_x = new WeakMap(), _Background_y = new WeakMap(), _Background_img = new WeakMap();
        }
    };
});
