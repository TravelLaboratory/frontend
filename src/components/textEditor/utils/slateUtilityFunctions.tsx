import { Editor, Transforms, Element as SlateElement } from 'slate';
import { ReactEditor } from 'slate-react';

import { CustomElement, CustomText } from '../types';

type MarkFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'superscript'
  | 'subscript'
  | 'color'
  | 'bgColor'
  | 'fontSize'
  | 'fontFamily';

type BlockFormat = 'alignLeft' | 'alignCenter' | 'alignRight' | 'orderedList' | 'unorderedList' | 'image' | 'video';

// type EmbedFormat = 'image';

// type ToolbarFormat = MarkFormat | BlockFormat | EmbedFormat;

const alignment: BlockFormat[] = ['alignLeft', 'alignRight', 'alignCenter'];
const listTypes: BlockFormat[] = ['orderedList', 'unorderedList'];

interface MarkData {
  format: MarkFormat;
  value: any;
}

interface DefaultMarkData {
  [key: string]: string;
}

const defaultMarkData: DefaultMarkData = {
  color: 'black',
  bgColor: 'black',
  fontSize: 'small',
  fontFamily: 'sans'
};

export const sizeMap: { [key: string]: string } = {
  small: '0.75em',
  normal: '1em',
  medium: '1.75em',
  huge: '2.5em'
};

export const fontFamilyMap: { [key: string]: string } = {
  sans: 'Helvetica,Arial, sans-serif',
  serif: 'Georgia, Times New Roman,serif',
  monospace: 'Monaco, Courier New,monospace'
};

type CustomEditor = Editor & ReactEditor;

export const activeMark = (editor: CustomEditor, format: MarkFormat): string => {
  const marks = Editor.marks(editor) as Partial<CustomText>;
  const markValue = marks?.[format];
  const defaultValue = defaultMarkData[format];
  return typeof markValue === 'string' ? markValue : defaultValue;
};

export const addMarkData = (editor: CustomEditor, data: MarkData) => {
  console.log('Adding mark data:', data);
  Editor.addMark(editor, data.format, data.value);
  ReactEditor.focus(editor);
};

export const isMarkActive = (editor: CustomEditor, format: MarkFormat): boolean => {
  const marks = Editor.marks(editor) as Partial<CustomText>;
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: CustomEditor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
  ReactEditor.focus(editor);
};

export const isBlockActive = (editor: CustomEditor, format: BlockFormat): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as CustomElement).type === format
  });
  return !!match;
};

export const toggleBlock = (editor: CustomEditor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = listTypes.includes(format);
  const isIndent = alignment.includes(format);
  const isAligned = alignment.some((alignmentType) => isBlockActive(editor, alignmentType));

  if (isAligned && isIndent) {
    Transforms.unwrapNodes(editor, {
      match: (n) => alignment.includes((!Editor.isEditor(n) && (n as CustomElement).type) as BlockFormat),
      split: true
    });
  }
  if (isIndent) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: []
    } as any); // TypeScript workaround for children array type
    return;
  }

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      listTypes.includes(
        (!Editor.isEditor(n) && SlateElement.isElement(n) && (n as CustomElement).type) as BlockFormat
      ),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  } as any); // TypeScript workaround for type field

  if (isList && !isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: []
    } as any); // TypeScript workaround for children array type
  }
};
