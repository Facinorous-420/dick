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

    const buttonModal = document.getElementsByClassName('buttonModal');
    const showModal = document.getElementById('showModal');

    function fireModal() {
        for (let index = 0; index < buttonModal.length; index++) {
            buttonModal[index].addEventListener('click', () => {
                if(showModal.classList.contains('flex')){
                    showModal.classList.remove('flex')
                    showModal.classList.add('hidden')
                }else{
                    showModal.classList.remove('hidden')
                    showModal.classList.add('flex')
                }
            });
        }
    }
    fireModal();
});