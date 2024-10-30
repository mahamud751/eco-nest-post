import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";

export const TINY_MCE_EDITOR_INIT: InitOptions = {
  placeholder: "Type here...",
  height: 600,

  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  importcss_append: true,
  template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
  template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
  image_caption: true,
  noneditable_noneditable_class: "mceNonEditable",
  toolbar_mode: "sliding",
  contextmenu: "link image table",
  plugins:
    "print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons",
  toolbar:
    "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media link anchor codesample | ltr rtl",
  quickbars_selection_toolbar:
    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
};
