import getAllowedResourcesForNodeType from './getAllowedResourcesForNodeType';
import getLinkedContentTypeIdsForNodeType from './getLinkedContentTypeIdsForNodeType';
export const newEntitySelectorConfigFromRichTextField = (field, nodeType)=>{
    return {
        entityType: getEntityTypeFromRichTextNode(nodeType),
        locale: field.locale || null,
        contentTypes: getLinkedContentTypeIdsForNodeType(field, nodeType)
    };
};
function getEntityTypeFromRichTextNode(nodeType) {
    const words = nodeType.split('-');
    if (words.indexOf('entry') !== -1) {
        return 'Entry';
    }
    if (words.indexOf('asset') !== -1) {
        return 'Asset';
    }
    throw new Error(`RichText node type \`${nodeType}\` has no associated \`entityType\``);
}
/**
 * Returns a config for the entity selector based on a given rich text field and a
 * rich text node type that the entity should be picked for. Takes the field
 * validations for the given node type into account.
 *
 * @param {object} field
 * @param {string} nodeType
 * @returns {object}
 */ export const newResourceEntitySelectorConfigFromRichTextField = (field, nodeType)=>{
    return {
        allowedResources: getAllowedResourcesForNodeType(field, nodeType)
    };
};
