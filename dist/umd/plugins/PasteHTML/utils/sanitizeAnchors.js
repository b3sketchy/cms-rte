(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.sanitizeAnchors = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "sanitizeAnchors", {
        enumerable: true,
        get: function() {
            return sanitizeAnchors;
        }
    });
    const wrapSpaceAround = (el)=>{
        const spacer = new Text(' ');
        const parent = el.parentNode;
        if (!parent) {
            return;
        }
        if (el.previousSibling) {
            parent.insertBefore(spacer, el);
        }
        if (el.nextSibling) {
            parent.insertBefore(spacer, el.nextSibling);
        }
    };
    const unwrap = (el)=>{
        // add a spacer to avoid the content being cramped together with
        // the element siblings after it's unwrapped. It may not always
        // be desired but it should be easy to adjust by the end user.
        wrapSpaceAround(el);
        el.replaceWith(...Array.from(el.childNodes));
    };
    const sanitizeAnchors = (doc)=>{
        const unsupportedTagSelector = `a :not(${[
            // Bold
            'b',
            'strong',
            // Code
            'code',
            'pre',
            // Italic
            'em',
            'i',
            // Super/subscript
            'sub',
            'sup',
            // Underline
            'u',
            // Other
            'span'
        ].join(',')})`;
        doc.querySelectorAll(unsupportedTagSelector).forEach(unwrap);
        return doc;
    };
});
