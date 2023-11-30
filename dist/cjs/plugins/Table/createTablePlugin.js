"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createTablePlugin", {
    enumerable: true,
    get: function() {
        return createTablePlugin;
    }
});
const _richtexttypes = require("@contentful/rich-text-types");
const _platetable = require("@udecode/plate-table");
const _editor = require("../../helpers/editor");
const _transformers = require("../../helpers/transformers");
const _queries = require("../../internal/queries");
const _transforms = require("../../internal/transforms");
const _Cell = require("./components/Cell");
const _HeaderCell = require("./components/HeaderCell");
const _Row = require("./components/Row");
const _Table = require("./components/Table");
const _helpers = require("./helpers");
const _insertTableFragment = require("./insertTableFragment");
const _onKeyDownTable = require("./onKeyDownTable");
const _tableTracking = require("./tableTracking");
const createTablePlugin = ()=>(0, _platetable.createTablePlugin)({
        type: _richtexttypes.BLOCKS.TABLE,
        handlers: {
            // @ts-expect-error
            onKeyDown: _onKeyDownTable.onKeyDownTable
        },
        withOverrides: (editor, plugin)=>{
            const { normalizeNode } = editor;
            // injects important fixes from plate's original table plugin
            (0, _platetable.withTable)(editor, plugin);
            // Resets all normalization rules added by @udecode/plate-table as
            // they conflict with our own
            editor.normalizeNode = normalizeNode;
            (0, _tableTracking.addTableTrackingEvents)(editor);
            editor.insertFragment = (0, _insertTableFragment.insertTableFragment)(editor);
            return editor;
        },
        overrideByKey: {
            [_platetable.ELEMENT_TABLE]: {
                type: _richtexttypes.BLOCKS.TABLE,
                component: _Table.Table,
                normalizer: [
                    {
                        validNode: _helpers.isNotEmpty
                    },
                    {
                        // Move to root level unless nested
                        validNode: (editor, [, path])=>{
                            // Nested tables are handled by another normalization
                            // rule in a the table cell level
                            const isNestedTable = !!(0, _queries.getBlockAbove)(editor, {
                                at: path,
                                match: {
                                    type: [
                                        _richtexttypes.BLOCKS.TABLE_CELL,
                                        _richtexttypes.BLOCKS.TABLE_HEADER_CELL
                                    ]
                                }
                            });
                            return (0, _editor.isRootLevel)(path) || isNestedTable;
                        },
                        transform: _transformers.transformLift
                    },
                    {
                        validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE]
                    }
                ]
            },
            [_platetable.ELEMENT_TR]: {
                type: _richtexttypes.BLOCKS.TABLE_ROW,
                component: _Row.Row,
                normalizer: [
                    {
                        validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE_ROW],
                        transform: (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.TABLE_CELL)
                    },
                    {
                        // Remove empty rows
                        validNode: _helpers.isNotEmpty
                    },
                    {
                        // Parent must be a table
                        validNode: (editor, [, path])=>{
                            const parent = (0, _queries.getParentNode)(editor, path)?.[0];
                            return parent && parent.type === _richtexttypes.BLOCKS.TABLE;
                        },
                        transform: (0, _transformers.transformWrapIn)(_richtexttypes.BLOCKS.TABLE)
                    },
                    {
                        // ensure consistent number of cells in each row
                        validNode: (editor, entry)=>{
                            return (0, _helpers.getNoOfMissingTableCellsInRow)(editor, entry) === 0;
                        },
                        transform: (editor, entry)=>{
                            const howMany = (0, _helpers.getNoOfMissingTableCellsInRow)(editor, entry);
                            const at = (0, _queries.getNextPath)((0, _queries.getLastChildPath)(entry));
                            (0, _transforms.insertNodes)(editor, (0, _helpers.createEmptyTableCells)(howMany), {
                                at
                            });
                        }
                    }
                ]
            },
            [_platetable.ELEMENT_TH]: {
                type: _richtexttypes.BLOCKS.TABLE_HEADER_CELL,
                component: _HeaderCell.HeaderCell,
                normalizer: [
                    {
                        validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE_HEADER_CELL],
                        transform: (0, _tableTracking.withInvalidCellChildrenTracking)(_transformers.transformParagraphs)
                    }
                ]
            },
            [_platetable.ELEMENT_TD]: {
                type: _richtexttypes.BLOCKS.TABLE_CELL,
                component: _Cell.Cell,
                normalizer: [
                    {
                        validChildren: _richtexttypes.CONTAINERS[_richtexttypes.BLOCKS.TABLE_CELL],
                        transform: (0, _tableTracking.withInvalidCellChildrenTracking)(_transformers.transformParagraphs)
                    }
                ]
            }
        }
    });
