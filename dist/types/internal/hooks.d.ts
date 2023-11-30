import * as p from '@udecode/plate-common';
import { PlateEditor, Value } from './types';
export declare const useReadOnly: () => boolean;
export declare const usePlateEditorRef: (id?: string) => PlateEditor;
export declare const usePlateEditorState: (id?: string) => PlateEditor;
export declare const usePlateSelectors: (id?: string) => p.GetRecord<p.PlateStoreState<Value, PlateEditor>>;
export declare const useFocused: () => boolean;
