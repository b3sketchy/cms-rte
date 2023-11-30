import * as p from '@udecode/plate-common';
import * as s from 'slate';
import type { Value, PlateEditor, Location, PlatePlugin } from './types';
export type CreatePlateEditorOptions = Omit<p.CreatePlateEditorOptions<Value, PlateEditor>, 'plugins'> & {
    plugins?: PlatePlugin[];
};
export declare const createPlateEditor: (options?: CreatePlateEditorOptions) => any;
/**
 * The only reason for this helper to exist is to run the initial normalization
 * before mounting the Plate editor component which in turn avoids the false
 * trigger of `onChange`.
 *
 * Background:
 *
 * Due to legacy behavior, it's possible to have "valid" RT document (based on
 * the schema from rich-text-types) that doesn't make sense. For example, links
 * with no text nodes?[1]. Solving that requires an initial normalization pass
 * which modifies the slate tree by definition -> triggering onChange.
 *
 * The initial onChange trigger is undesirable as the user may not have touched
 * the RT content yet or the editor is rendered as readonly.
 *
 * Ideally, we should not initialize the editor twice but that's the only
 * way that I could get this to work. Improvements are welcome.
 *
 * [1]: See cypress/e2e/rich-text/.../invalidDocumentNormalizable.js for more
 *      examples.
 */
export declare const normalizeInitialValue: (options: CreatePlateEditorOptions, initialValue?: Value) => Value;
export declare const focusEditor: (editor: PlateEditor, target?: Location) => void;
export declare const blurEditor: (editor: PlateEditor) => void;
export declare const selectEditor: (editor: PlateEditor, opts: p.SelectEditorOptions) => void;
export declare const fromDOMPoint: (editor: PlateEditor, domPoint: [Node, number], opts?: {
    exactMatch: boolean;
    suppressThrow: boolean;
}) => s.BasePoint | null | undefined;
export declare const mockPlugin: (plugin?: Partial<PlatePlugin> | undefined) => p.WithPlatePlugin<any, p.Value, p.PlateEditor<p.Value>>;
