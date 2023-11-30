(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("react"), require("@testing-library/jest-dom/extend-expect"), require("@contentful/field-editor-reference"), require("@contentful/field-editor-test-utils"), require("@testing-library/react"), require("../__fixtures__/published_content_type.json"), require("../__fixtures__/published_entry.json"), require("../__fixtures__/space.json"), require("../FetchingWrappedResourceCard"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "react",
        "@testing-library/jest-dom/extend-expect",
        "@contentful/field-editor-reference",
        "@contentful/field-editor-test-utils",
        "@testing-library/react",
        "../__fixtures__/published_content_type.json",
        "../__fixtures__/published_entry.json",
        "../__fixtures__/space.json",
        "../FetchingWrappedResourceCard"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.fetchingWrappedResourceCardTest = {}, global.react, global.extendExpect, global.fieldEditorReference, global.fieldEditorTestUtils, global.react, global.publishedContentTypeJson, global.publishedEntryJson, global.spaceJson, global.fetchingWrappedResourceCard);
})(this, function(exports, _react, _extendexpect, _fieldeditorreference, _fieldeditortestutils, _react1, _published_content_typejson, _published_entryjson, _spacejson, _FetchingWrappedResourceCard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    _react = /*#__PURE__*/ _interop_require_wildcard(_react);
    _published_content_typejson = /*#__PURE__*/ _interop_require_default(_published_content_typejson);
    _published_entryjson = /*#__PURE__*/ _interop_require_default(_published_entryjson);
    _spacejson = /*#__PURE__*/ _interop_require_default(_spacejson);
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
    const resolvableEntryUrn = 'crn:contentful:::content:spaces/space-id/entries/linked-entry-urn';
    const unknownEntryUrn = 'crn:contentful:::content:spaces/space-id/entries/unknown-entry-urn';
    beforeEach(()=>{
        sdk = {
            locales: {
                default: 'en-US'
            },
            cmaAdapter: (0, _fieldeditortestutils.createFakeCMAAdapter)({
                ContentType: {
                    get: jest.fn().mockReturnValue(_published_content_typejson.default)
                },
                Entry: {
                    get: jest.fn().mockImplementation(({ entryId })=>{
                        if (entryId === 'linked-entry-urn') {
                            return Promise.resolve(_published_entryjson.default);
                        }
                        return Promise.reject(new Error());
                    })
                },
                Locale: {
                    getMany: jest.fn().mockResolvedValue({
                        items: [
                            {
                                default: true,
                                code: 'en'
                            }
                        ]
                    })
                },
                ScheduledAction: {
                    getMany: jest.fn().mockResolvedValue({
                        items: [],
                        total: 0
                    })
                },
                Space: {
                    get: jest.fn().mockResolvedValue(_spacejson.default)
                }
            }),
            space: {
                onEntityChanged: jest.fn()
            },
            navigator: {},
            ids: {
                space: 'space-id',
                environment: 'environment-id'
            }
        };
    });
    function renderResourceCard({ linkType = 'Contentful:Entry', entryUrn = resolvableEntryUrn } = {}) {
        return (0, _react1.render)(/*#__PURE__*/ _react.createElement(_fieldeditorreference.EntityProvider, {
            sdk: sdk
        }, /*#__PURE__*/ _react.createElement(_FetchingWrappedResourceCard.FetchingWrappedResourceCard, {
            isDisabled: false,
            isSelected: false,
            sdk: sdk,
            link: {
                type: 'ResourceLink',
                linkType: linkType,
                urn: entryUrn
            }
        })));
    }
    test('renders entry card', async ()=>{
        const { getByTestId, getByText } = renderResourceCard();
        await (0, _react1.waitFor)(()=>expect(getByTestId('cf-ui-entry-card')).toBeDefined());
        expect(getByText(_published_entryjson.default.fields.exField.en)).toBeDefined();
        expect(getByText(_spacejson.default.name)).toBeDefined();
    });
    test('renders skeleton when no data is provided', ()=>{
        const { getByTestId } = renderResourceCard();
        expect(getByTestId('cf-ui-skeleton-form')).toBeDefined();
    });
    test('renders unsupported entity card when unsupported link is passed', async ()=>{
        const { getByText } = renderResourceCard({
            linkType: 'Contentful:UnsupportedLink'
        });
        await (0, _react1.waitFor)(()=>expect(getByText('Resource type Contentful:UnsupportedLink is currently not supported')).toBeDefined());
    });
    test('renders missing entity card when unknown error is returned', async ()=>{
        const { getByTestId } = renderResourceCard({
            entryUrn: unknownEntryUrn
        });
        await (0, _react1.waitFor)(()=>expect(getByTestId('cf-ui-missing-entry-card')).toBeDefined());
    });
});
