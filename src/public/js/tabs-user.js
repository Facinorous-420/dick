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
    const tabUser = document.getElementsByClassName('tabUser');
    const showConfigGen = document.getElementsByClassName('changeTabUser');


    function fireTabsProfile() {
        const loop = [
            { id: 1, contains: 1, remove: 1, add: 0 },
            { id: 2, contains: 0, remove: 0, add: 1 }
        ]

        var currentTab = []
        //index 0 is for tab file manager and 1 is config-gen
        loop.forEach((e, index) => {
            
            tabUser[index].addEventListener('click', () => {
                if (tabUser[e.contains].classList.contains('border-b-2', 'border-accent', 'font-semibold')) {
                    tabUser[e.remove].classList.remove('border-b-2', 'border-accent', 'font-semibold');
                    tabUser[e.add].classList.add('border-b-2', 'border-accent', 'font-semibold');
                }
                
                currentTab.push(tabUser[index].dataset.id)

                if(currentTab.slice(-2)[0] != tabUser[index].dataset.id || (currentTab.length <= 1 && tabUser[index].dataset.id == 2)){
                    for (let idx = 0; idx < showConfigGen.length; idx++) {

                        if (showConfigGen[idx].classList.contains('flex-1')) {
                            showConfigGen[idx].classList.remove('flex-1');
                            showConfigGen[idx].classList.add('hidden');
                        } else {
                            showConfigGen[idx].classList.remove('hidden');
                            showConfigGen[idx].classList.add('flex-1');
                        }
                    }
                }
            });
        })
    }
    fireTabsProfile();
});