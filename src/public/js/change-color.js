// DOM Ready Function
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// DOM Ready Called
ready(function () {
    const colorPicker = document.querySelector('.custom-color-picker-border');

    colorPicker.addEventListener('input',()=>{
        colorPicker.style.setProperty('--color', colorPicker.value)
    })

});