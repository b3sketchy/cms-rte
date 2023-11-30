import { BLOCKS } from '@contentful/rich-text-types';
import { createResetNodePlugin as createDefaultResetNodePlugin } from '@udecode/plate-reset-node';
export const createResetNodePlugin = ()=>createDefaultResetNodePlugin({
        options: {
            rules: []
        },
        then: (editor)=>{
            const rules = editor.plugins.flatMap((p)=>{
                return p.resetNode || [];
            });
            // set defaultType to Paragraph if not set
            for (const rule of rules){
                if (!rule.defaultType) {
                    rule.defaultType = BLOCKS.PARAGRAPH;
                }
            }
            return {
                options: {
                    rules
                }
            };
        }
    });
