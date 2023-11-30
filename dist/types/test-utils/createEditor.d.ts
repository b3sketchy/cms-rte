import { FieldAppSDK } from '@contentful/app-sdk';
import { PlatePlugin } from '../internal/types';
import { RichTextTrackingActionHandler } from '../plugins/Tracking';
export declare const createTestEditor: (options: {
    input?: any;
    sdk?: FieldAppSDK;
    trackingHandler?: RichTextTrackingActionHandler;
    plugins?: PlatePlugin[];
}) => {
    editor: any;
    normalize: () => void;
};
