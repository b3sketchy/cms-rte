/**
 * Trim leading slash character if found. Bails otherwise.
 *
 * @example
 * trimLeadingSlash("/my query") // --> "my query"
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "trimLeadingSlash", {
    enumerable: true,
    get: function() {
        return trimLeadingSlash;
    }
});
function trimLeadingSlash(text) {
    if (!text.startsWith('/')) {
        return text;
    }
    return text.slice(1);
}
