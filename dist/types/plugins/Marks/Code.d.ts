import * as React from 'react';
import { MARKS } from '@contentful/rich-text-types';
import { PlatePlugin, RenderLeafProps } from '../../internal/types';
export declare const ToolbarCodeButton: {
    ({ isDisabled }: {
        isDisabled?: boolean | undefined;
    }): React.JSX.Element | null;
    displayName: MARKS;
};
export declare const ToolbarDropdownCodeButton: {
    ({ isDisabled }: {
        isDisabled?: boolean | undefined;
    }): React.JSX.Element | null;
    displayName: MARKS;
};
export declare function Code(props: RenderLeafProps): React.JSX.Element;
export declare const createCodePlugin: () => PlatePlugin;