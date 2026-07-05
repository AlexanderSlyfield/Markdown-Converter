
// Clear button logic:
const clearButtons = document.querySelectorAll('.clear-btn');

function clearText() {
    const text = this.closest('.pannel').querySelector('textarea');

    text.focus();
    text.value = '';

    text.dispatchEvent(new Event('input'));
}
clearButtons.forEach(button => {
    button.onclick = clearText;
});

// Start of conversion logic:
const markdownTextarea = document.querySelector('#markdown-text');
const HTMLTextarea = document.querySelector('#HTML-text');
const convertBtn = document.querySelector('#convert-btn');


let HTML;
const convert = () => {
    const markdown = markdownTextarea.value;

    // BLOCK
    // Headings:
    HTML = markdown.replace(/^\s*#\s(.+)$/gm, '<h1>$1</h1>');
    HTML = HTML.replace(/^\s*##\s(.+)$/gm, '<h2>$1</h2>');
    HTML = HTML.replace(/^\s*###\s(.+)$/gm, '<h3>$1</h3>');
    HTML = HTML.replace(/^\s*####\s(.+)$/gm, '<h4>$1</h4>');
    HTML = HTML.replace(/^\s*#####\s(.+)$/gm, '<h5>$1</h5>');
    HTML = HTML.replace(/^\s*######\s(.+)$/gm, '<h6>$1</h6>');

    // Blockquote:
    HTML = HTML.replace(/^\s*>\s(.+)$/gm, '<blockquote><p>$1</p></blockquote>');
    HTML = HTML.replace(/<\/blockquote>\r?\n<blockquote>/g, '');

    // Paragraphs:
    HTML = HTML.replace(/^\s*(?!<)(.+)$/gm, '<p>$1</p>');
    HTML = HTML.replace(/<\/p>\r?\n<p>/g, '');

    // INLINE
    // Bold/Italics:
    // HTML = HTML.replace(/\*\*((?:(?!\*\*).)*)\*\*/gm, '<strong>$1</strong>');
    HTML = HTML.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    HTML = HTML.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');

    HTML = HTML.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    HTML = HTML.replace(/__(.+?)__/g, '<strong>$1</strong>');
    HTML = HTML.replace(/\*(.+?)\*/g, '<em>$1</em>');
    HTML = HTML.replace(/\b_(.+?)_\b/g, '<em>$1</em>');

    // Strikethrough:
    HTML = HTML.replace(/~~(.+?)~~/g, '<s>$1</s>');
    HTML = HTML.replace(/~(.+?)~/g, '<s>$1</s>');








    if (markdown !== HTML) {
        HTMLTextarea.value = HTML;
    } else {
        HTMLTextarea.value = '';
    }
}

convertBtn.onclick = convert;

// Preview logic:
const preview = document.getElementById('preview');

markdownTextarea.addEventListener('input', () => {
    convert();
    preview.innerHTML = HTML;
})