(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/field-editor-reference"), require("@contentful/field-editor-test-utils"), require("@testing-library/jest-dom/extend-expect"), require("@testing-library/react"), require("../__fixtures__/published_content_type.json"), require("../__fixtures__/published_entry.json"), require("../FetchingWrappedEntryCard"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/field-editor-reference",
        "@contentful/field-editor-test-utils",
        "@testing-library/jest-dom/extend-expect",
        "@testing-library/react",
        "../__fixtures__/published_content_type.json",
        "../__fixtures__/published_entry.json",
        "../FetchingWrappedEntryCard"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.fetchingWrappedEntryCardTest = {}, global.react, global.fieldEditorReference, global.fieldEditorTestUtils, global.extendExpect, global.react, global.publishedContentTypeJson, global.publishedEntryJson, global.fetchingWrappedEntryCard);
})(this, function(exports, _react, _fieldeditorreference, _fieldeditortestutils, _extendexpect, _react1, _published_content_typejson, _published_entryjson, _FetchingWrappedEntryCard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _published_content_typejson = /*#__PURE__*/ _interop_require_default(_published_content_typejson);
    _published_entryjson = /*#__PURE__*/ _interop_require_default(_published_entryjson);
    function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _getRequireWildcardCache(nodeInterop) {
        if (typeof WeakMap !== "function") return null;
        var cacheBabelInterop = new WeakMap();
        var cacheNodeInterop = new WeakMap();
        return (_getRequireWildcardCache = function(nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) {
            return obj;
        }
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
            return {
                default: obj
            };
        }
        var cache = _getRequireWildcardCache(nodeInterop);
        if (cache && cache.has(obj)) {
            return cache.get(obj);
        }
        var newObj = {
            __proto__: null
        };
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var key in obj){
            if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
                if (desc && (desc.get || desc.set)) {
                    Object.defineProperty(newObj, key, desc);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
        newObj.default = obj;
        if (cache) {
            cache.set(obj, newObj);
        }
        return newObj;
    }
    (0, _react1.configure)({
        testIdAttribute: 'data-test-id'
    });
    let sdk;
    beforeEach(()=>{
        sdk = {
            locales: {
                default: 'en-US'
            },
            cmaAdapter: (0, _fieldeditortestutils.createFakeCMAAdapter)({
                Entry: {
                    get: jest.fn().mockResolvedValue(_published_entryjson.default)
                },
                ScheduledAction: {
                    getMany: jest.fn().mockResolvedValue({
                        items: [],
                        total: 0
                    })
                }
            }),
            space: {
                getEntityScheduledActions: jest.fn().mockResolvedValue([]),
                getCachedContentTypes: jest.fn().mockReturnValue([
                    _published_content_typejson.default
                ])
            },
            navigator: {
                onSlideInNavigation: jest.fn()
            },
            ids: {
                space: 'space-id',
                environment: 'environment-id'
            }
        };
    });
    test('some dropdown actions should be disabled/removed', async ()=>{
        const { getByTestId, queryByTestId } = (0, _react1.render)(/*#__PURE__*/ _react.createElement(_fieldeditorreference.EntityProvider, {
            sdk: sdk
        }, /*#__PURE__*/ _react.createElement(_FetchingWrappedEntryCard.FetchingWrappedEntryCard, {
            sdk: sdk,
            entryId: "entry-id",
            locale: "en-US",
            // eslint-disable-next-line -- TODO: explain this disable
            onEdit: ()=>{},
            // eslint-disable-next-line -- TODO: explain this disable
            onRemove: ()=>{},
            isDisabled: true,
            isSelected: true
        })));
        // Assert Asset title
        await (0, _react1.waitFor)(()=>expect(getByTestId('title').textContent).toBe('The best article ever'));
        _react1.fireEvent.click(getByTestId('cf-ui-card-actions'));
        await (0, _react1.waitFor)(()=>{
            expect(getByTestId('edit')).not.toBeDisabled();
            expect(queryByTestId('delete')).toBeNull();
        });
    });
});
