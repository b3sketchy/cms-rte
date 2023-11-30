import * as React from 'react';
import { FieldAppSDK } from '@contentful/app-sdk';
import * as Contentful from '@contentful/rich-text-types';
import { RichTextTrackingActionHandler } from './plugins/Tracking';
type ConnectedProps = {
    sdk: FieldAppSDK;
    onAction?: RichTextTrackingActionHandler;
    minHeight?: string | number;
    maxHeight?: string | number;
    value?: Contentful.Document;
    isDisabled?: boolean;
    onChange?: (doc: Contentful.Document) => unknown;
    isToolbarHidden?: boolean;
    actionsDisabled?: boolean;
    restrictedMarks?: string[];
};
export declare const ConnectedRichTextEditor: (props: ConnectedProps) => React.JSX.Element;
type Props = ConnectedProps & {
    isInitiallyDisabled: boolean;
};
declare const RichTextEditor: (props: Props) => React.JSX.Element;
export default RichTextEditor;
