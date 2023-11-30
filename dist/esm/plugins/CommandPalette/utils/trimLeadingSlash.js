/**
 * Trim leading slash character if found. Bails otherwise.
 *
 * @example
 * trimLeadingSlash("/my query") // --> "my query"
 */ export function trimLeadingSlash(text) {
    if (!text.startsWith('/')) {
        return text;
    }
    return text.slice(1);
}
