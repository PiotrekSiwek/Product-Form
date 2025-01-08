import { forwardRef, MutableRefObject, PropsWithChildren, useEffect, useLayoutEffect, useRef } from "react";
import Quill, { Delta } from "quill";

type TextChangeHandler = (delta: Delta, oldContents: Delta, context: any) => any

interface EditorProps {
  onTextChange?: TextChangeHandler;
  setEditorValue: (value: string) => void;
}

const Editor = forwardRef<HTMLDivElement, PropsWithChildren<EditorProps>>(({ onTextChange, setEditorValue }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onTextChangeRef = useRef(onTextChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
      placeholder: "Description",
      modules: {
        toolbar: [["bold", "italic", "underline"]],
      },
    });

    if (ref && typeof ref === 'object'){
    (ref as MutableRefObject<Quill | null>).current = quill;

    }
    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      const content = quill.root.innerHTML;
      setEditorValue(content);
    });

    return () => {
      (ref as MutableRefObject<Quill | null>).current = null;
      container.innerHTML = "";
    };
  }, [ref, setEditorValue]);

  return <div ref={containerRef}></div>;
});

Editor.displayName = "Editor";

export default Editor;
