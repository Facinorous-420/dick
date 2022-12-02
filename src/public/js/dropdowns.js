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

    const traMove = document.getElementsByClassName('traMove');

    const dropdownNavBtn = document.getElementById('dropdownNavBtn');
    const dropdownNav = document.getElementById('dropdownNav');

    const dropdownProfileBtn = document.getElementsByClassName('dropdownProfileBtn');
    const dropdownProfile = document.getElementsByClassName('dropdownProfile');

    const dropdownSearchBtn = document.getElementsByClassName('dropdownSearchBtn');
    const dropdownSearch = document.getElementsByClassName('dropdownSearch');

    const dropdownFileBtn = document.getElementsByClassName('dropdownFileBtn');

    // Dropdown Navbar Event
    function fireDropdownNav() {
        dropdownNavBtn.addEventListener('click', () => {
            if (dropdownNav.classList.contains('-translate-y-full')) {
                dropdownNav.classList.remove('-translate-y-full');
                dropdownNav.classList.add('translate-y-0', 'ease-linear');
                // When the event get fired, every 'traMove' id attibute will move down
                for (let index = 0; index < traMove.length; index++) {
                    traMove[index].classList.remove('-translate-y-32');
                    traMove[index].classList.add('translate-y-0', 'ease-linear');
                }
            } else {
                dropdownNav.classList.add('-translate-y-full',);
                dropdownNav.classList.remove('translate-y-0', 'ease-linear');
                // Then if you hide the event, every 'traMove' id attribute will back to normal
                for (let index = 0; index < traMove.length; index++) {
                    traMove[index].classList.add('-translate-y-32');
                    traMove[index].classList.remove('translate-y-0', 'ease-linear');
                }
            }
        });
    }
    fireDropdownNav();

    // Dropdown Profile Event
    function fireDropdownProfile() {
        for (let index = 0; index < dropdownProfileBtn.length; index++) {
            dropdownProfileBtn[index].addEventListener('click', () => {
                var timer;
                if (dropdownProfile[index].classList.contains('opacity-0')) {
                    window.clearTimeout(timer);
                    dropdownProfile[index].classList.remove('opacity-0', 'translate-y-6', 'invisible');
                    dropdownProfile[index].classList.add('translate-y-0', 'opacity-100');
                } else {
                    dropdownProfile[index].classList.add('opacity-0', 'translate-y-6');
                    dropdownProfile[index].classList.remove('translate-y-0', 'opacity-100');

                    //Set timer to hide the dropdown
                    //the value of timer '250' must be same as the tailwind class 'duration-250' in the class dropdownProfile attribute 
                    timer = window.setTimeout(() => {
                        dropdownProfile[index].classList.add('invisible');
                    }, 250);
                }
            });

            // Click outside event
            window.addEventListener('click', (eve) => {
                if (!dropdownProfileBtn[index].contains(eve.target) && !dropdownProfile[index].contains(eve.target)) {
                    dropdownProfile[index].classList.add('opacity-0', 'translate-y-6');
                    dropdownProfile[index].classList.remove('translate-y-0', 'opacity-100');

                    // Same as above
                    timer = window.setTimeout(() => {
                        dropdownProfile[index].classList.add('invisible');
                    }, 250);
                }
            });
        }
    }
    fireDropdownProfile();

    // Dropdown Search Event
    function fireDropdownSearch() {
        for (let index = 0; index < dropdownSearchBtn.length; index++) {
            dropdownSearchBtn[index].addEventListener('click', () => {
                var timer;
                if (dropdownSearch[index].classList.contains('opacity-0')) {
                    window.clearTimeout(timer);
                    dropdownSearch[index].classList.remove('opacity-0', 'translate-y-6', 'invisible');
                    dropdownSearch[index].classList.add('translate-y-0', 'opacity-100');
                } else {
                    dropdownSearch[index].classList.add('opacity-0', 'translate-y-6');
                    dropdownSearch[index].classList.remove('translate-y-0', 'opacity-100');

                    //Set timer to hide the dropdown
                    //the value of timer '250' must be same as the tailwind class 'duration-250' in the class dropdownSearch attribute 
                    timer = window.setTimeout(() => {
                        dropdownSearch[index].classList.add('invisible');
                    }, 250);
                }
            });

            // Click outside event
            window.addEventListener('click', (eve) => {
                if (!dropdownSearchBtn[index].contains(eve.target) && !dropdownSearch[index].contains(eve.target)) {
                    dropdownSearch[index].classList.add('opacity-0', 'translate-y-6');
                    dropdownSearch[index].classList.remove('translate-y-0', 'opacity-100');

                    // Same as above
                    timer = window.setTimeout(() => {
                        dropdownSearch[index].classList.add('invisible');
                    }, 250);
                }
            });
        }
    }
    fireDropdownSearch();

    // Dropdown File Event
    function fireDropdownFile() {
        for (let index = 0; index < dropdownFileBtn.length; index++) {
            const findSibling = dropdownFileBtn[index].parentElement.children[1];

            dropdownFileBtn[index].addEventListener('click', () => {
                var timer;
                if (findSibling.classList.contains('opacity-0')) {
                    window.clearTimeout(timer);
                    findSibling.classList.remove('opacity-0', 'translate-y-6', 'invisible');
                    findSibling.classList.add('translate-y-0', 'opacity-100');
                } else {
                    findSibling.classList.add('opacity-0', 'translate-y-6');
                    findSibling.classList.remove('translate-y-0', 'opacity-100');

                    //Set timer to hide the dropdown
                    //the value of timer '250' must be same as the tailwind class 'duration-250' in the class dropdownFile attribute
                    timer = window.setTimeout(() => {
                        findSibling.classList.add('invisible');
                    }, 250);
                }
            });

            // Click outside event
            window.addEventListener('click', (eve) => {
                if (!dropdownFileBtn[index].contains(eve.target) && !findSibling.contains(eve.target)) {
                    findSibling.classList.add('opacity-0', 'translate-y-6');
                    findSibling.classList.remove('translate-y-0', 'opacity-100');

                    // Same as above
                    timer = window.setTimeout(() => {
                        findSibling.classList.add('invisible');
                    }, 250);
                }
            });
        }
    }
    fireDropdownFile();
});