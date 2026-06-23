"use client";

import React, { useRef, useEffect } from "react";
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
  const editorRef = useRef<HTMLDivElement>(null);

  // Synchronize internal HTML with parent value (only if it differs, to prevent cursor reset)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, arg: string = "") => {
    document.execCommand(command, false, arg);
    handleInput();
  };

  const addLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      let formattedUrl = url.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }
      execCommand("createLink", formattedUrl);
    }
  };

  return (
    <div className="w-full rounded-lg border border-neutral-300 bg-white overflow-hidden focus-within:border-neutral-900">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-neutral-200 bg-neutral-50 p-1.5 select-none">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Bold"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Italic"
        >
          <Italic size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Underline"
        >
          <Underline size={15} />
        </button>
        
        <div className="w-[1px] bg-neutral-300 mx-1 self-stretch my-0.5" />
        
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Bullet List"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </button>
        
        <div className="w-[1px] bg-neutral-300 mx-1 self-stretch my-0.5" />
        
        <button
          type="button"
          onClick={addLink}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Insert Link"
        >
          <Link2 size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCommand("removeFormat")}
          className="p-1.5 hover:bg-neutral-200 rounded text-neutral-700 transition-colors"
          title="Clear Formatting"
        >
          <RemoveFormatting size={15} />
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="min-h-[150px] max-h-[400px] overflow-y-auto p-3 outline-none text-sm text-neutral-800 prose prose-sm max-w-none break-words"
        data-placeholder={placeholder}
        style={{ minHeight: "150px" }}
      />
    </div>
  );
}
