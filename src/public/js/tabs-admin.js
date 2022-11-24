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
    const tabAdmin = document.getElementsByClassName('tabAdmin');
    const changeTabAdmin = document.getElementsByClassName('changeTabAdmin');

     // Tabs Admin Event
    function fireTabsAdmin() {
        //Dynamic tabs with loops
        const loop = [
            { id: 1, contains: 1, remove: 1, add: 0 },
            { id: 2, contains: 0, remove: 0, add: 1 }
        ]

        var currentTab = []
        //index 0 is for tab app-setting and 1 is users
        loop.forEach((e, index) => {
            tabAdmin[index].addEventListener('click', () => {
                if (tabAdmin[e.contains].classList.contains('border-b-2', 'border-accent', 'font-semibold')) {
                    tabAdmin[e.remove].classList.remove('border-b-2', 'border-accent', 'font-semibold');
                    tabAdmin[e.add].classList.add('border-b-2', 'border-accent', 'font-semibold');
                }
                
                currentTab.push(tabAdmin[index].dataset.id)

                if(currentTab.slice(-2)[0] != tabAdmin[index].dataset.id || (currentTab.length <= 1 && tabAdmin[index].dataset.id == 2)){
                    for (let idx = 0; idx < changeTabAdmin.length; idx++) {
                        if (changeTabAdmin[idx].classList.contains('flex-1')) {
                            changeTabAdmin[idx].classList.remove('flex-1');
                            changeTabAdmin[idx].classList.add('hidden');
                        } else {
                            changeTabAdmin[idx].classList.remove('hidden');
                            changeTabAdmin[idx].classList.add('flex-1');
                        }
                    }
                }
            });
        })
    }
    fireTabsAdmin();
});

