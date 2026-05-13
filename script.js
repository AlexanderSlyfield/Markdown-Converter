
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

