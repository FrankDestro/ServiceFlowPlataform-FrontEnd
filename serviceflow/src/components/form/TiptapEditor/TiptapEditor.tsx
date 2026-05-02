import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import { useEffect, useMemo } from "react";
import "highlight.js/styles/atom-one-dark.css";
import "./TiptapEditor.css";
import CharacterCount from "@tiptap/extension-character-count";

const lowlight = createLowlight(common);

type Props = {
    content: string;
    onChange: (value: string) => void;
    editable?: boolean;
};

function TiptapEditor({ content, onChange, editable = true }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            Placeholder.configure({
                placeholder: "Escreva o conteúdo do artigo...",
            }),
            CodeBlockLowlight.configure({ lowlight, defaultLanguage: "plaintext" }),
            CharacterCount,
        ],
        content: editable ? { type: "doc", content: [{ type: "paragraph" }] } : content || "",
        editable,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor || !editable) return;
        if (content && editor.isEmpty) {
            editor.commands.setContent(content);
        }
    }, [editor, content, editable]);

    const providerValue = useMemo(() => ({ editor }), [editor]);

    if (!editor) return null;

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="tiptap-wrapper">
                {editable && (
                    <div className="tiptap-toolbar">
                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive("bold") ? "tiptap-btn active" : "tiptap-btn"}>B</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive("italic") ? "tiptap-btn active" : "tiptap-btn"}>I</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive("strike") ? "tiptap-btn active" : "tiptap-btn"}>S</button>
                        <div className="tiptap-divider" />
                        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={editor.isActive("heading", { level: 1 }) ? "tiptap-btn active" : "tiptap-btn"}>H1</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive("heading", { level: 2 }) ? "tiptap-btn active" : "tiptap-btn"}>H2</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={editor.isActive("heading", { level: 3 }) ? "tiptap-btn active" : "tiptap-btn"}>H3</button>
                        <div className="tiptap-divider" />
                        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive("bulletList") ? "tiptap-btn active" : "tiptap-btn"}>• —</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive("orderedList") ? "tiptap-btn active" : "tiptap-btn"}>1.</button>
                        <div className="tiptap-divider" />
                        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive("blockquote") ? "tiptap-btn active" : "tiptap-btn"}>❝</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive("codeBlock") ? "tiptap-btn active" : "tiptap-btn"}>&lt;/&gt;</button>
                        <div className="tiptap-divider" />
                        <button type="button" onClick={() => editor.chain().focus().undo().run()}
                            className="tiptap-btn">↩</button>
                        <button type="button" onClick={() => editor.chain().focus().redo().run()}
                            className="tiptap-btn">↪</button>
                    </div>
                )}
                <EditorContent editor={editor} />

                {editable && (
                    <div className="tiptap-footer">
                        <span>{editor.storage.characterCount?.characters() ?? 0} caracteres</span>
                        <span>{editor.storage.characterCount?.words() ?? 0} palavras</span>
                    </div>
                )}

                {/* BubbleMenu - aparece ao selecionar texto */}
                <BubbleMenu editor={editor}>
                    <div className="tiptap-bubble-menu">
                        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive("bold") ? "tiptap-btn active" : "tiptap-btn"}>B</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive("italic") ? "tiptap-btn active" : "tiptap-btn"}>I</button>
                        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive("strike") ? "tiptap-btn active" : "tiptap-btn"}>S</button>
                    </div>
                </BubbleMenu>


            </div>
        </EditorContext.Provider>
    );
}

export default TiptapEditor;