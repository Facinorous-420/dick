// DOM Ready Function
function ready(fn) {
    if (document.readyState != 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
  }
  
  // DOM Ready Called
  ready(function () {
  
    const tabsAdmin = document.getElementsByClassName('tabsAdmin')
    const tabsAdminContent = document.getElementsByClassName('tabsAdminContent')
  
    const traMove = document.getElementsByClassName('traMove')
    const dropdownNavBtn = document.getElementById('dropdownNavBtn')
    const dropdownNav = document.getElementById('dropdownNav')
  
    const dropdownProfileBtn = document.getElementsByClassName('dropdownProfileBtn')
    const dropdownProfile = document.getElementsByClassName('dropdownProfile')

    // Dropdown Navbar Event
    function fireDropdownNav(){
        dropdownNavBtn.addEventListener('click', () => {
            if (dropdownNav.classList.contains('-translate-y-full')) {
                dropdownNav.classList.remove('-translate-y-full')
                dropdownNav.classList.add('translate-y-0', 'ease-linear')
                // When the event get fired, every 'traMove' id attibute will move down
                Array.prototype.forEach.call(traMove, (e) => {
                    e.classList.remove('-translate-y-32')
                    e.classList.add('translate-y-0', 'ease-linear')
                })
            } else {
                dropdownNav.classList.add('-translate-y-full',)
                dropdownNav.classList.remove('translate-y-0', 'ease-linear')
                 // Then if you hide the event, every 'traMove' id attribute will back to normal
                Array.prototype.forEach.call(traMove, (e) => {
                    e.classList.add('-translate-y-32')
                    e.classList.remove('translate-y-0', 'ease-linear')
                })
            }
        })
    }
    fireDropdownNav()
  
    // Dropdown Profile Event
    function fireDropdownProfile() {
        Array.prototype.forEach.call(dropdownProfileBtn, function (e, index) {
            e.addEventListener('click', () => {
                var timer
                if (dropdownProfile[index].classList.contains('opacity-0')) {
                    window.clearTimeout(timer)
                    dropdownProfile[index].classList.remove('opacity-0', 'translate-y-6', 'invisible')
                    dropdownProfile[index].classList.add('translate-y-0', 'opacity-100')
                } else {
                    dropdownProfile[index].classList.add('opacity-0', 'translate-y-6')
                    dropdownProfile[index].classList.remove('translate-y-0', 'opacity-100')
                    //Set timer to hide the dropdown
                    //the value of timer '250' must be same as the tailwind class 'duration-250' in the class dropdownProfile attribute 
                    timer = window.setTimeout( () => {
                        dropdownProfile[index].classList.add('invisible')
                    }, 250)
                }
            })
            // Click outside event
            window.addEventListener('click', (eve) => {
                if (!dropdownProfileBtn[index].contains(eve.target) && !dropdownProfile[index].contains(eve.target)) {
                    dropdownProfile[index].classList.add('opacity-0', 'translate-y-6')
                    dropdownProfile[index].classList.remove('translate-y-0', 'opacity-100')
                    // Same as above
                    timer = window.setTimeout( () => {
                        dropdownProfile[index].classList.add('invisible')
                    }, 250)
                }
            })
        })
    }
    fireDropdownProfile()

    // Tabs Admin Event
    function fireTabsAdmin(){
        //App Settings Tab = 0
        tabsAdmin[0].addEventListener('click', () => {
            if (tabsAdmin[1].classList.contains('border-b-2', 'border-purple-400', 'font-semibold')) {
                tabsAdmin[1].classList.remove('border-b-2', 'border-purple-400', 'font-semibold')
                tabsAdmin[0].classList.add('border-b-2', 'border-purple-400', 'font-semibold')
                tabsAdminContent[1].classList.add('hidden')
                tabsAdminContent[0].classList.remove('hidden')
            }
        });
        //Users Settings Tab = 1
        tabsAdmin[1].addEventListener('click', () => {
            if (tabsAdmin[0].classList.contains('border-b-2', 'border-purple-400', 'font-semibold')) {
                tabsAdmin[0].classList.remove('border-b-2', 'border-purple-400', 'font-semibold')
                tabsAdmin[1].classList.add('border-b-2', 'border-purple-400', 'font-semibold')
                tabsAdminContent[0].classList.add('hidden')
                tabsAdminContent[1].classList.remove('hidden')
            }
        })
    }
    fireTabsAdmin()
  })