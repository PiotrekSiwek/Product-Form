import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";

const Editor = forwardRef(({ onTextChange, setEditorValue }, ref) => {
  const containerRef = useRef(null);
  const onTextChangeRef = useRef(onTextChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
  });

  useEffect(() => {
    const container = containerRef.current;
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

    ref.current = quill;

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      const content = quill.root.innerHTML;
      setEditorValue(content);
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref, setEditorValue]);

  return <div ref={containerRef}></div>;
});

Editor.displayName = "Editor";

export default Editor;
