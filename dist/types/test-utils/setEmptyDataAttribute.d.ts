import { PlateEditor } from '../internal/types';
/**
 * Sets empty node.data attributes. Helpful when testing against
 * output generated by a 3rd-party library e.g. Plate.
 */
export declare const setEmptyDataAttribute: (root: PlateEditor) => void;