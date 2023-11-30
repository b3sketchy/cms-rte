(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@contentful/field-editor-reference"), require("@contentful/field-editor-test-utils"), require("@testing-library/jest-dom/extend-expect"), require("@testing-library/react"), require("../__fixtures__/published_asset.json"), require("../FetchingWrappedAssetCard"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@contentful/field-editor-reference",
        "@contentful/field-editor-test-utils",
        "@testing-library/jest-dom/extend-expect",
        "@testing-library/react",
        "../__fixtures__/published_asset.json",
        "../FetchingWrappedAssetCard"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.fetchingWrappedAssetCardTest = {}, global.react, global.fieldEditorReference, global.fieldEditorTestUtils, global.extendExpect, global.react, global.publishedAssetJson, global.fetchingWrappedAssetCard);
})(this, function(exports, _react, _fieldeditorreference, _fieldeditortestutils, _extendexpect, _react1, _published_assetjson, _FetchingWrappedAssetCard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _published_assetjson = /*#__PURE__*/ _interop_require_default(_published_assetjson);
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
                Asset: {
                    get: jest.fn().mockResolvedValue(_published_assetjson.default)
                },
                ScheduledAction: {
                    getMany: jest.fn().mockResolvedValue({
                        items: [],
                        total: 0
                    })
                }
            }),
            space: {
                getEntityScheduledActions: jest.fn().mockResolvedValue([])
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
    test('some dropdown actions should be disabled', async ()=>{
        const { getByTestId, queryByTestId } = (0, _react1.render)(/*#__PURE__*/ _react.createElement(_fieldeditorreference.EntityProvider, {
            sdk: sdk
        }, /*#__PURE__*/ _react.createElement(_FetchingWrappedAssetCard.FetchingWrappedAssetCard, {
            sdk: sdk,
            assetId: "asset-id",
            locale: "en-US",
            // eslint-disable-next-line -- TODO: explain this disable
            onEdit: ()=>{},
            // eslint-disable-next-line -- TODO: explain this disable
            onRemove: ()=>{},
            isDisabled: true,
            isSelected: true
        })));
        // Assert Asset title
        await (0, _react1.waitFor)(()=>expect(getByTestId('cf-ui-asset').textContent).toBe('asset title'));
        _react1.fireEvent.click(getByTestId('cf-ui-card-actions'));
        await (0, _react1.waitFor)(()=>{
            expect(getByTestId('card-action-edit')).not.toBeDisabled();
            expect(queryByTestId('card-action-remove')).toBeNull();
            expect(getByTestId('card-action-download')).not.toBeDisabled();
        });
    });
});
