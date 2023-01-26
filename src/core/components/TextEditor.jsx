import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor(props) {

       const editorRef = useRef(null);

       return (
              <>     <div className="shadow mb-5">
                     <Editor
                            apiKey={process.env.REACT_APP_TINY_KEY}
                            onInit={(evt, editor) =>
                                   (editorRef.current = editor)
                            }
                            //initialValue="<p>This is the initial content of the editor.</p>"
                            value={props.postData}
                            onEditorChange={(newValue, editor) => {props.setPostData(newValue); props.setError(false)}}
                            init={{
                                   height: 800,
                                   menubar: false,
                                   plugins: [
                                          "advlist",
                                          "autolink",
                                          "lists",
                                          "link",
                                          "image",
                                          "charmap",
                                          "preview",
                                          "anchor",
                                          "searchreplace",
                                          "visualblocks",
                                          "code",
                                          "fullscreen",
                                          "insertdatetime",
                                          "media",
                                          "table",
                                          "code",
                                          "help",
                                          "wordcount",
                                   ],
                                   toolbar:
                                          "undo redo | blocks | " +
                                          "bold italic forecolor | alignleft aligncenter " +
                                          "alignright alignjustify | bullist numlist outdent indent | " +
                                          "removeformat | help",
                                   content_style:
                                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                     /></div>
                    
              </>
       );
}

export default TextEditor;
