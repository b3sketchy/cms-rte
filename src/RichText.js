import React from 'react'
import { Editor } from './editor/Editor'

const defaultInitialValue = {
  "nodeType": "document",
  "data": {},
  "content": [
    {
      "nodeType": "paragraph",
      "data": {},
      "content": [
        {
          "nodeType": "text",
          "value": "",
          "marks": [],
          "data": {}
        }
      ]
    }
  ]
}

export const RichText = ({ model, modelUpdate }) => {
  const {
    height,
    controls
  } = model

  return (
    <Editor
      height={height || 200}
      controls={controls || ['bold', 'underline', 'italics', 'list', 'link']}
      value={model.initialValue?.defaultValue || defaultInitialValue}
      onChange={(value) => modelUpdate({ value: value })}
      onAction={(action) => console.log({ action })}
    />
  );
}
