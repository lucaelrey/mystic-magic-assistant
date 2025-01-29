import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && value) {
      if (editor.getHTML() !== value) {
        editor.commands.setContent(value);
      }
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const headingSizes = [
    { label: 'Normal', command: () => editor.chain().focus().setParagraph().run() },
    { label: 'Überschrift 1', command: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'Überschrift 2', command: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Überschrift 3', command: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  ];

  const alignments = [
    { label: 'Links', value: 'left', icon: '←' },
    { label: 'Zentriert', value: 'center', icon: '↔' },
    { label: 'Rechts', value: 'right', icon: '→' },
  ];

  const setLink = () => {
    const url = window.prompt('URL eingeben:');

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-md">
      <style>
        {`
          .ProseMirror {
            padding: 1rem;
            min-height: 400px;
          }
          .ProseMirror h1 {
            font-size: 2.25rem;
            line-height: 2.5rem;
            margin: 2rem 0 1rem;
            font-weight: 700;
          }
          .ProseMirror h2 {
            font-size: 1.875rem;
            line-height: 2.25rem;
            margin: 1.75rem 0 0.875rem;
            font-weight: 600;
          }
          .ProseMirror h3 {
            font-size: 1.5rem;
            line-height: 2rem;
            margin: 1.5rem 0 0.75rem;
            font-weight: 600;
          }
          .ProseMirror p {
            margin: 1.25rem 0;
            line-height: 1.75;
          }
          .ProseMirror ul {
            list-style-type: disc !important;
            padding-left: 1.5rem;
            margin: 1.25rem 0;
          }
          .ProseMirror ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem;
            margin: 1.25rem 0;
          }
          .ProseMirror li {
            margin: 0.5rem 0;
            padding-left: 0.5rem;
            display: list-item !important;
          }
          .ProseMirror li > p {
            margin: 0;
          }
          .ProseMirror blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
          }
          .ProseMirror a {
            color: #3b82f6;
            text-decoration: underline;
          }
          .ProseMirror a:hover {
            color: #2563eb;
          }
        `}
      </style>
      <div className="border-b p-2 flex flex-wrap gap-2">
        <select 
          onChange={(e) => {
            const size = headingSizes[parseInt(e.target.value)];
            size.command();
          }}
          className="px-2 py-1 rounded border bg-white"
          value={editor.isActive('paragraph') ? '0' : editor.isActive('heading', { level: 1 }) ? '1' : editor.isActive('heading', { level: 2 }) ? '2' : '3'}
        >
          {headingSizes.map((size, index) => (
            <option key={size.label} value={index}>
              {size.label}
            </option>
          ))}
        </select>

        <div className="flex gap-1 border-l pl-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              'p-2 rounded hover:bg-gray-100',
              editor.isActive('bold') && 'bg-gray-100'
            )}
            type="button"
            title="Fett"
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              'p-2 rounded hover:bg-gray-100',
              editor.isActive('italic') && 'bg-gray-100'
            )}
            type="button"
            title="Kursiv"
          >
            I
          </button>
        </div>

        <div className="flex gap-1 border-l pl-2">
          {alignments.map((alignment) => (
            <button
              key={alignment.value}
              onClick={() => editor.chain().focus().setTextAlign(alignment.value).run()}
              className={cn(
                'p-2 rounded hover:bg-gray-100',
                editor.isActive({ textAlign: alignment.value }) && 'bg-gray-100'
              )}
              type="button"
              title={alignment.label}
            >
              {alignment.icon}
            </button>
          ))}
        </div>

        <div className="flex gap-1 border-l pl-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              'p-2 rounded hover:bg-gray-100',
              editor.isActive('bulletList') && 'bg-gray-100'
            )}
            type="button"
            title="Aufzählung"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              'p-2 rounded hover:bg-gray-100',
              editor.isActive('orderedList') && 'bg-gray-100'
            )}
            type="button"
            title="Nummerierte Liste"
          >
            1.
          </button>
          <button
            onClick={setLink}
            className={cn(
              'p-2 rounded hover:bg-gray-100',
              editor.isActive('link') && 'bg-gray-100'
            )}
            type="button"
            title="Link einfügen"
          >
            🔗
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};