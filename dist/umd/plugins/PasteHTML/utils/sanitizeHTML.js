(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./sanitizeAnchors"), require("./sanitizeSheets"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./sanitizeAnchors",
        "./sanitizeSheets"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.sanitizeHTML = {}, global.sanitizeAnchors, global.sanitizeSheets);
})(this, function(exports, _sanitizeAnchors, _sanitizeSheets) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "sanitizeHTML", {
        enumerable: true,
        get: function() {
            return sanitizeHTML;
        }
    });
    /**
 * Remove all <style> tags
 */ const stripStyleTags = (doc)=>{
        doc.querySelectorAll('style').forEach((e)=>{
            e.remove();
        });
        return doc;
    };
    /**
 * Remove all <meta /> tags
 */ const stripMetaTags = (doc)=>{
        doc.querySelectorAll('meta').forEach((el)=>el.remove());
        return doc;
    };
    // Attention: Order is important
    const transformers = [
        stripStyleTags,
        _sanitizeSheets.sanitizeSheets,
        stripMetaTags,
        _sanitizeAnchors.sanitizeAnchors
    ];
    function removeTableWrappers(table) {
        const parent = table.parentElement;
        if (parent && parent.tagName === 'DIV' && parent.children.length === 1) {
            parent.replaceWith(table);
            removeTableWrappers(table);
        }
    }
    const sanitizeHTML = (html)=>{
        // Parse the HTML string and pipe it through our transformers
        const doc = transformers.reduce((value, cb)=>cb(value), new DOMParser().parseFromString(html, 'text/html'));
        const replacers = [
            // remove whitespaces between some tags, as this can lead to unwanted behaviour:
            // - table -> empty table cells
            // - list -> leading whitespaces
            (innerHtml)=>innerHtml.replace(/<(\/)?(table|thead|tbody|tr|td|th|caption|col|colgroup|ol|ul|li)(.*)>\s+<(\/)?(table|thead|tbody|tr|td|th|caption|col|colgroup|ol|ul|li)/g, '<$1$2$3><$4$5'),
            // remove empty elements before the ending block element tag
            (innerHtml)=>innerHtml.replace(/(?:<[^>^/]*>)\s*(?:<\/[^>]*>)<\/(div|p|table|thead|tbody|tr|td|th|caption|col|colgroup|ol|ul|li)/g, '</$1'),
            // remove whitespaces before the ending block element tag
            (innerHTML)=>innerHTML.replace(/\s*<\/(div|p|table|thead|tbody|tr|td|th|caption|col|colgroup|ol|ul|li)/g, '</$1')
        ];
        let previous;
        do {
            // save previous first before doing modifications
            previous = doc.body.innerHTML;
            doc.body.innerHTML = replacers.reduce((innerHTML, replacer)=>replacer(innerHTML), doc.body.innerHTML);
        }while (doc.body.innerHTML !== previous)
        // Removing the div container wrappers from tables
        // The div container including attributes and possible linebreaks inside wil be removed
        // TODO: can be removed with plate >= 20
        doc.querySelectorAll('table').forEach(removeTableWrappers);
        return doc.body.innerHTML;
    };
});
