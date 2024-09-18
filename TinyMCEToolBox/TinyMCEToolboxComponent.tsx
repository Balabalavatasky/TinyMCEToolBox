import * as React from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor, EditorEvent, Events } from "tinymce";

// TinyMCE so the global var exists
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/help/js/i18n/keynav/en';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';

export interface ITinyMCEToolboxProps {
  width: number;
  height: number;
  apiKey?: string;
  content?: string;
  onChange: (content: string) => void;
}

const TinyMCEToolboxComponent: React.FunctionComponent<ITinyMCEToolboxProps> = (
  props: ITinyMCEToolboxProps
) => {
  const {
    width = 500,
    height = 500,
    content = "",
    apiKey = "gpl",
    onChange,
  } = { ...props };
  const editorRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    editorRef.current?.setAttribute("height", `${height}px`);
    editorRef.current?.setAttribute("width", `${width}px`);
  }, [height, width, apiKey]);

  const onUserBlur = (event: unknown, editor: TinyMCEEditor) => {
    onChange(editor.getContent());
  };

  return (
    <>
      <div
        ref={editorRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Editor
          //licenseKey={apiKey}
          apiKey="7mfphosnwjuqnfss2fumh45rml21aysntbg6mwrm025j478j"
          initialValue={content}
          onBlur={onUserBlur}
          init={{
            resize: false,
            height: "100%",
            width: "100%",
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "advcode",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "powerpaste",
              "preview",
            ],
            powerpaste_allow_local_images: true,
            powerpaste_word_import: "prompt",
            powerpaste_html_import: "prompt",
            toolbar:
              "undo redo | insert | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </>
  );
};

export default TinyMCEToolboxComponent;
