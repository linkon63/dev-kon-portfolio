"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  RemoveFormatting,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Placeholder.configure({ placeholder: placeholder || "Write here…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] max-h-[400px] overflow-y-auto p-3 outline-none text-sm text-neutral-800 prose prose-sm max-w-none break-words tiptap",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Keep in sync if the parent resets `value` externally (e.g. loading a draft),
  // but never while the user is typing — TipTap owns the DOM, so this won't
  // disturb the caret.
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const btn =
    "p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors";
  const btnActive = "bg-neutral-200 text-neutral-900";

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL:", previous || "");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: formattedUrl })
      .run();
  };

  return (
    <div className="w-full rounded-lg border border-neutral-300 bg-white overflow-hidden focus-within:border-neutral-900">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-neutral-200 bg-neutral-50 p-1.5 select-none">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${btn} ${editor?.isActive("bold") ? btnActive : ""}`}
          title="Bold"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${btn} ${editor?.isActive("italic") ? btnActive : ""}`}
          title="Italic"
        >
          <Italic size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`${btn} ${editor?.isActive("underline") ? btnActive : ""}`}
          title="Underline"
        >
          <Underline size={15} />
        </button>

        <div className="w-[1px] bg-neutral-300 mx-1 self-stretch my-0.5" />

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${btn} ${editor?.isActive("bulletList") ? btnActive : ""}`}
          title="Bullet List"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`${btn} ${editor?.isActive("orderedList") ? btnActive : ""}`}
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </button>

        <div className="w-[1px] bg-neutral-300 mx-1 self-stretch my-0.5" />

        <button
          type="button"
          onClick={setLink}
          className={`${btn} ${editor?.isActive("link") ? btnActive : ""}`}
          title="Insert Link"
        >
          <Link2 size={15} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().unsetAllMarks().clearNodes().run()
          }
          className={btn}
          title="Clear Formatting"
        >
          <RemoveFormatting size={15} />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
