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
    const inputPasswordType = document.getElementById('inputPasswordType')
    const checkboxPassword = document.getElementById('checkboxPassword')

    function changeInputPasswordType() {
        checkboxPassword.addEventListener('change', (eve) => {
            
            const checked = eve.target.checked

            if (checked) {
                inputPasswordType.type = 'text'
            } else {
                inputPasswordType.type = 'password'
            }
        });
    }
    changeInputPasswordType();
});