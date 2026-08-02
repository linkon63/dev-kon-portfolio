"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  Heading2,
  Heading3,
  Quote,
  Plus,
  ImageIcon,
  Minus,
  Loader2,
  X,
} from "lucide-react";
import { uploadFile } from "@/lib/storage";

interface MediumEditorProps {
  title: string;
  onTitleChange: (val: string) => void;
  content: string;
  onContentChange: (html: string) => void;
  titlePlaceholder?: string;
  bodyPlaceholder?: string;
}

/**
 * A Medium-style writing canvas: a large auto-growing title field followed by a
 * distraction-free WYSIWYG body. Selecting text reveals a floating format
 * bubble; empty lines reveal a "+" menu for inserting images and dividers.
 * Images upload immediately and are embedded inline as final URLs.
 */
export default function MediumEditor({
  title,
  onTitleChange,
  content,
  onContentChange,
  titlePlaceholder = "Title",
  bodyPlaceholder = "Tell your story…",
}: MediumEditorProps) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: { class: "blog-inline-img" },
      }),
      Placeholder.configure({ placeholder: bodyPlaceholder }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "tiptap rich-text blog-body min-h-[45vh] max-w-none break-words text-lg leading-[1.8] text-[var(--ink)]/85 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onContentChange(editor.getHTML()),
  });

  // Sync external content resets (e.g. loading a draft) without disturbing the
  // caret while typing.
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content || "", { emitUpdate: false });
    }
  }, [content, editor]);

  // Auto-grow the title textarea.
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [title]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL:", previous || "");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    let formatted = url.trim();
    if (!/^https?:\/\//i.test(formatted)) formatted = `https://${formatted}`;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: formatted })
      .run();
  }, [editor]);

  const insertImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploadError("");
      setUploading(true);
      try {
        const url = await uploadFile("blogs", file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (e) {
        setUploadError(
          e instanceof Error ? e.message : "Image upload failed.",
        );
      } finally {
        setUploading(false);
        setAddOpen(false);
      }
    },
    [editor],
  );

  const insertDivider = useCallback(() => {
    editor?.chain().focus().setHorizontalRule().run();
    setAddOpen(false);
  }, [editor]);

  const bubbleBtn = (active: boolean) =>
    `grid h-8 w-8 place-items-center rounded transition-colors ${
      active ? "text-emerald-400" : "text-white/90 hover:text-white"
    }`;

  return (
    <div className="relative">
      {/* Hidden input drives every image insertion */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) insertImage(f);
          e.target.value = "";
        }}
      />

      {/* Title */}
      <textarea
        ref={titleRef}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            editor?.commands.focus("start");
          }
        }}
        rows={1}
        placeholder={titlePlaceholder}
        className="w-full resize-none border-none bg-transparent p-0 text-4xl font-extrabold leading-[1.15] tracking-tight text-[var(--ink)] outline-none placeholder:text-[var(--ink)]/25 md:text-5xl"
      />

      <div className="mt-6">
        {/* Selection bubble menu */}
        {editor && (
          <BubbleMenu
            editor={editor}
            options={{ placement: "top" }}
            className="flex items-center gap-0.5 rounded-lg bg-neutral-900 px-1.5 py-1 shadow-xl ring-1 ring-black/20"
          >
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={bubbleBtn(editor.isActive("bold"))}
              title="Bold"
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={bubbleBtn(editor.isActive("italic"))}
              title="Italic"
            >
              <Italic size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={bubbleBtn(editor.isActive("underline"))}
              title="Underline"
            >
              <Underline size={16} />
            </button>
            <button
              type="button"
              onClick={setLink}
              className={bubbleBtn(editor.isActive("link"))}
              title="Link"
            >
              <Link2 size={16} />
            </button>

            <span className="mx-1 h-5 w-px bg-white/20" />

            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={bubbleBtn(editor.isActive("heading", { level: 2 }))}
              title="Large heading"
            >
              <Heading2 size={16} />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={bubbleBtn(editor.isActive("heading", { level: 3 }))}
              title="Small heading"
            >
              <Heading3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={bubbleBtn(editor.isActive("blockquote"))}
              title="Quote"
            >
              <Quote size={16} />
            </button>
          </BubbleMenu>
        )}

        {/* Empty-line "+" insert menu */}
        {editor && (
          <FloatingMenu
            editor={editor}
            options={{ placement: "left-start" }}
            className="flex items-center"
          >
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setAddOpen((o) => !o)}
                className={`grid h-8 w-8 place-items-center rounded-full border border-[var(--ink)]/30 text-[var(--ink)]/60 transition-transform hover:border-[var(--ink)]/60 hover:text-[var(--ink)] ${
                  addOpen ? "rotate-45" : ""
                }`}
                title="Add image or divider"
              >
                <Plus size={18} />
              </button>
              {addOpen && (
                <div className="ml-2 flex items-center gap-1 rounded-full border border-[var(--ink)]/15 bg-white px-1.5 py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="grid h-8 w-8 place-items-center rounded-full text-emerald-600 hover:bg-emerald-50"
                    title="Insert image"
                  >
                    {uploading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ImageIcon size={18} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={insertDivider}
                    className="grid h-8 w-8 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                    title="Insert divider"
                  >
                    <Minus size={18} />
                  </button>
                </div>
              )}
            </div>
          </FloatingMenu>
        )}

        <EditorContent editor={editor} />
      </div>

      {/* Upload status */}
      {uploading && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white shadow-lg">
          <Loader2 size={15} className="animate-spin" /> Uploading image…
        </div>
      )}
      {uploadError && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          <span>{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError("")}
            className="text-red-400 hover:text-red-600"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
