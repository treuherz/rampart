import Monaco from "@monaco-editor/react";
import "./Editor.css";
import { useRef } from "react";

export default function Editor({ onContentChange }) {
  const ref = useRef(null);

  function handleEditorDidMount(editor) {
    ref.current = editor;
    handleChange(editor.getModel().getValue());
  }

  function handleChange(content) {
    onContentChange(content);
  }

  const defaultValue = `0 0
10 0
11 10
19 10
21 -10
29 -10
30 0`;

  const options = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
  };

  return (
    <Monaco
      className="monaco"
      defaultLanguage="plaintext"
      defaultValue={defaultValue}
      onMount={handleEditorDidMount}
      onChange={handleChange}
      options={options}
    />
  );
}
