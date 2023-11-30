/* eslint-disable you-dont-need-lodash-underscore/find */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, /**
 * Given a field object and a rich text node type, return a list of valid
 * content type IDs associated with the node type, based on that node type's
 * `linkContentType` validation.
 *
 * If there is no such validation or the validation is empty, return an empty
 * array.
 *
 * The navigation here is explained by the `nodes` validation having signature:
 * { nodes: { [nodeType]: validationObject[] } }
 *
 * We defensively navigate through this object because
 * 1) the field may not have a `validations` array,
 * 2) the `validations` array may be empty,
 * 3) the `validations` array may not have a `nodes` validation,
 * 4) the `nodes` validation may not validate the `nodeType`, and
 * 5) the `nodeType` validations may not have a `linkContentType` validation.
 *
 * Note that passing an empty array will result in all possible content types
 * being whitelisted.
 *
 * @param {object} field
 * @param {string} nodeType
 * @returns {string[]}
 */ "default", {
    enumerable: true,
    get: function() {
        return getLinkedContentTypeIdsForNodeType;
    }
});
const _find = /*#__PURE__*/ _interop_require_default(require("lodash/find"));
const _flow = /*#__PURE__*/ _interop_require_default(require("lodash/flow"));
const _get = /*#__PURE__*/ _interop_require_default(require("lodash/get"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getLinkedContentTypeIdsForNodeType(field, nodeType) {
    return (0, _flow.default)((v)=>(0, _find.default)(v, 'nodes'), (v)=>(0, _get.default)(v, [
            'nodes',
            nodeType
        ]), (v)=>(0, _find.default)(v, 'linkContentType'), (v)=>(0, _get.default)(v, 'linkContentType', []))(field.validations);
}
