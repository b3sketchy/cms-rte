import * as p from '@udecode/plate-common';
import * as sr from 'slate-react';
export const useReadOnly = sr.useReadOnly;
export const usePlateEditorRef = (id)=>{
    return p.usePlateEditorRef(id);
};
export const usePlateEditorState = (id)=>{
    return p.usePlateEditorState(id);
};
export const usePlateSelectors = (id)=>{
    return p.usePlateSelectors(id);
};
export const useFocused = ()=>{
    return sr.useFocused();
};
