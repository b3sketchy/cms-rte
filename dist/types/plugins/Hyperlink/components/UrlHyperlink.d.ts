import * as React from 'react';
import { Link } from '@contentful/app-sdk';
import { Element, RenderElementProps } from '../../../internal/types';
type HyperlinkElementProps = {
    element: Element & {
        data: {
            uri?: string;
            target: {
                sys: {
                    id: string;
                    linkType: 'Entry' | 'Asset';
                    type: 'Link';
                };
            };
        };
    };
    target?: Link;
    onEntityFetchComplete?: VoidFunction;
    children: Pick<RenderElementProps, 'children'>;
};
export declare function UrlHyperlink(props: HyperlinkElementProps): React.JSX.Element;
export {};
