const textArea = document.querySelector('textarea');

textArea.addEventListener('input', () => {
    const getCharCount = (str, char) => {
        return (str.match(new RegExp(char, 'gi')) || []).length
    }
    var value = textArea.value;
    var size = textArea.rows
    var newRow = '\n'
    var value_rows = getCharCount(value, newRow)
    textArea.rows = value_rows + 1
})