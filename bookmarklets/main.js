function myFunction(a) {
    var copyText = document.getElementById(a);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}