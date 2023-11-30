const isResourceLink = (link)=>!!link.sys.urn;
export const getLinkEntityId = (link)=>isResourceLink(link) ? link.sys.urn : link.sys.id;
export function truncateTitle(str, length) {
    if (typeof str === 'string' && str.length > length) {
        return str && str.substr(0, length + 1) // +1 to look ahead and be replaced below.
        // Get rid of orphan letters but not one letter words (I, a, 2).
        // Try to not have “.” as last character to avoid awkward “....”.
        .replace(/(\s+\S(?=\S)|\s*)\.?.$/, '…');
    }
    return str;
}
