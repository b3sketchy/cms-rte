(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./Bold"), require("./Code"), require("./Italic"), require("./Subscript"), require("./Superscript"), require("./Underline"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./Bold",
        "./Code",
        "./Italic",
        "./Subscript",
        "./Superscript",
        "./Underline"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.bold, global.code, global.italic, global.subscript, global.superscript, global.underline);
})(this, function(exports, _Bold, _Code, _Italic, _Subscript, _Superscript, _Underline) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "createMarksPlugin", {
        enumerable: true,
        get: function() {
            return createMarksPlugin;
        }
    });
    const createMarksPlugin = ()=>({
            key: 'Marks',
            plugins: [
                (0, _Bold.createBoldPlugin)(),
                (0, _Code.createCodePlugin)(),
                (0, _Italic.createItalicPlugin)(),
                (0, _Underline.createUnderlinePlugin)(),
                (0, _Superscript.createSuperscriptPlugin)(),
                (0, _Subscript.createSubscriptPlugin)()
            ]
        });
});
