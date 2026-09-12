"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Quote, Image as ImageIcon, Link as LinkIcon, Undo, Redo 
} from "lucide-react";
//import { uploadPostImage } from "@/lib/storage";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  onImageUploaded?: (url: string) => void;
}

export function TiptapEditor({ value, onChange, onImageUploaded }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Tulis isi artikel atau berita di sini..." }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose max-w-none p-4 min-h-[350px] focus:outline-none dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Handler Upload Gambar dari Tombol Toolbar
  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        try {
          //const publicUrl = await uploadPostImage(file);
          
          // Inject gambar ke dalam editor
          //editor.chain().focus().setImage({ src: publicUrl }).run();

          // Kirim ke parent jika perlu dicatat di tabel post_images
          //if (onImageUploaded) onImageUploaded(publicUrl);
        } catch (err) {
          alert("Gagal mengunggah gambar");
        }
      }
    };

    input.click();
  };

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white dark:bg-slate-900 dark:border-slate-800">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("bold") ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("italic") ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        
        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("heading", { level: 1 }) ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("bulletList") ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("orderedList") ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 ${editor.isActive("blockquote") ? "bg-slate-200 dark:bg-slate-700" : ""}`}
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={handleAddImage}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          title="Unggah Gambar"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}