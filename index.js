document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('#message');

    textarea.addEventListener('focus', function() {
        this.setSelectionRange(0, 0);
    });

    textarea.addEventListener('click', function(event) {
        event.preventDefault();
        this.setSelectionRange(0, 0);
        this.focus();
    });

    textarea.addEventListener('mousedown', function(event) {
        event.preventDefault();
        this.setSelectionRange(0, 0);
    });
});
