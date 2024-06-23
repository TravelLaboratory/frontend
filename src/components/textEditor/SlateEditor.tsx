'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { createEditor, Descendant, Transforms, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';

import ImageEmbed from './ImageEmbed';
import Toolbar from './Toolbar';
import { ImageElement } from './types';
import serialize from './utils/serialize';

function Element(props: RenderElementProps) {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'headingOne':
      return <h1 {...attributes}>{children}</h1>;
    case 'headingTwo':
      return <h2 {...attributes}>{children}</h2>;
    case 'headingThree':
      return <h3 {...attributes}>{children}</h3>;
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'alignLeft':
      return (
        <div style={{ textAlign: 'left', listStylePosition: 'inside' }} {...attributes}>
          {children}
        </div>
      );
    case 'alignCenter':
      return (
        <div style={{ textAlign: 'center', listStylePosition: 'inside' }} {...attributes}>
          {children}
        </div>
      );
    case 'alignRight':
      return (
        <div style={{ textAlign: 'right', listStylePosition: 'inside' }} {...attributes}>
          {children}
        </div>
      );
    case 'image': {
      const imageElement = element as ImageElement;
      return (
        <ImageEmbed attributes={attributes} element={imageElement}>
          {children}
        </ImageEmbed>
      );
    }

    default:
      return <p {...attributes}>{children}</p>;
  }
}

function Leaf(props: RenderLeafProps) {
  const { attributes, children, leaf } = props;
  let modifiedChildren = children;

  if (leaf.bold) {
    modifiedChildren = <strong>{modifiedChildren}</strong>;
  }

  if (leaf.italic) {
    modifiedChildren = <em>{modifiedChildren}</em>;
  }
  if (leaf.strikethrough) {
    modifiedChildren = <span style={{ textDecoration: 'line-through' }}>{modifiedChildren}</span>;
  }
  if (leaf.underline) {
    modifiedChildren = <u>{modifiedChildren}</u>;
  }
  if (leaf.superscript) {
    modifiedChildren = <sup>{modifiedChildren}</sup>;
  }
  if (leaf.subscript) {
    modifiedChildren = <sub>{modifiedChildren}</sub>;
  }
  if (leaf.color) {
    console.log(leaf.color);
    modifiedChildren = <span style={{ color: leaf.color }}>{modifiedChildren}</span>;
  }

  if (leaf.fontSize) {
    modifiedChildren = <span style={{ fontSize: leaf.fontSize }}>{modifiedChildren}</span>;
  }
  return <span {...attributes}>{modifiedChildren}</span>;
}

const insertBreak = (editor: Editor) => {
  const { selection } = editor;
  if (selection) {
    Transforms.insertText(editor, '\n');
  }
};

const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      event.preventDefault();
      insertBreak(editor);
    }
  }
};

function SlateEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [serializedValue, setSerializedValue] = useState('');
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  const handleButtonClick = () => {
    setSerializedValue(serialize(value));
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    >
      <div>
        <Toolbar />

        <div className="px-40 pt-[300px]">
          <Editable
            placeholder="글을 작성해보세요"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => handleKeyDown(event, editor)}
          />
        </div>

        <div className="w-full">
          <button onClick={handleButtonClick} className="text-white mt-4 rounded bg-blue-500 p-2" type="button">
            Show HTML 발행하기
          </button>
          <h2>HTML Output:</h2>
          <div>{serializedValue}</div>
          <div dangerouslySetInnerHTML={{ __html: serializedValue }} />
        </div>
      </div>
    </Slate>
  );
}

export default SlateEditor;