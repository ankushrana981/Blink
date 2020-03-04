
CKEDITOR.editorConfig = function( config ) {
	config.toolbar = [
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
		{ name: 'links', items: [ 'Link', 'Unlink' ] },
		{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'] },
		'/',
		{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'document', items: [ 'Source' ] }
	];

	config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Flash,HorizontalRule,PageBreak,Iframe,Format,Styles,ShowBlocks,Maximize,About';
};