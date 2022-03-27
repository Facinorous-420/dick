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

  const openFile = document.getElementById('openFile');
  const showFile = document.getElementById('showFile');

  const traMove = document.getElementsByClassName('traMove');
  const tabsProfile = document.getElementsByClassName('tabsProfile');
  const tabsProfileContent = document.getElementsByClassName('tabsProfileContent');
  const dropdownNavBtn = document.getElementById('dropdownNavBtn');
  const dropdownNav = document.getElementById('dropdownNav');

  const dropdownProfileBtn = document.getElementsByClassName('dropdownProfileBtn');
  const dropdownProfile = document.getElementsByClassName('dropdownProfile');

  const dropdownSearchBtn = document.getElementsByClassName('dropdownSearchBtn');
  const dropdownSearch = document.getElementsByClassName('dropdownSearch');
  const dropdownFileBtn = document.getElementsByClassName('dropdownFileBtn');

  // Open File Manager Event
  /*
  function fireFileManager(){
      openFile.addEventListener('click', () => {
          showFile.click();
      });
  }
  fireFileManager();
*/

  // Dropdown Navbar Event
  function fireDropdownNav(){
      dropdownNavBtn.addEventListener('click', () => {
          if (dropdownNav.classList.contains('-translate-y-full')) {
              dropdownNav.classList.remove('-translate-y-full');
              dropdownNav.classList.add('translate-y-0', 'ease-linear');

              // When the event get fired, every 'traMove' id attibute will move down
              Array.prototype.forEach.call(traMove, (e) => {
                  e.classList.remove('-translate-y-32');
                  e.classList.add('translate-y-0', 'ease-linear');
              });
          } else {
              dropdownNav.classList.add('-translate-y-full',);
              dropdownNav.classList.remove('translate-y-0', 'ease-linear');

               // Then if you hide the event, every 'traMove' id attribute will back to normal
              Array.prototype.forEach.call(traMove, (e) => {
                  e.classList.add('-translate-y-32');
                  e.classList.remove('translate-y-0', 'ease-linear');
              });
          }
      });
  }
  fireDropdownNav();

  // Dropdown Profile Event
  function fireDropdownProfile() {
      Array.prototype.forEach.call(dropdownProfileBtn, function (e, index) {
          e.addEventListener('click', () => {
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
                  timer = window.setTimeout( () => {
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
                  timer = window.setTimeout( () => {
                      dropdownProfile[index].classList.add('invisible');
                  }, 250);
              }
          });
      });
  }
  fireDropdownProfile();


  // Dropdown Search Event
  function fireDropdownSearch() {
      Array.prototype.forEach.call(dropdownSearchBtn, (e, index) => {
          e.addEventListener('click', () => {
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
                  timer = window.setTimeout( () => {
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
                  timer = window.setTimeout( () => {
                      dropdownSearch[index].classList.add('invisible');
                  }, 250);
              }
          });

      });
  }
  fireDropdownSearch();

  // Dropdown File Event
  function fireDropdownFile() {
      Array.prototype.forEach.call(dropdownFileBtn, (e, index) => {
          const findSibling = e.parentElement.children[1];
          e.addEventListener('click', () => {
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
                  timer = window.setTimeout( () => {
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
                  timer = window.setTimeout( () => {
                      findSibling.classList.add('invisible');
                  }, 250);
              }

          });

      });
  }
  fireDropdownFile();

  // Tabs Profile Event
  function fireTabsProfile(){
      //File Manager Tab = 0
      tabsProfile[0].addEventListener('click', () => {
          if (tabsProfile[1].classList.contains('border-b-2', 'border-purple-400', 'font-semibold')) {
              tabsProfile[1].classList.remove('border-b-2', 'border-purple-400', 'font-semibold');
              tabsProfile[0].classList.add('border-b-2', 'border-purple-400', 'font-semibold');
              tabsProfileContent[1].classList.add('hidden');
              tabsProfileContent[0].classList.remove('hidden');
          }
      });
      //Config Gen Tab = 1
      tabsProfile[1].addEventListener('click', () => {
          if (tabsProfile[0].classList.contains('border-b-2', 'border-purple-400', 'font-semibold')) {
              tabsProfile[0].classList.remove('border-b-2', 'border-purple-400', 'font-semibold');
              tabsProfile[1].classList.add('border-b-2', 'border-purple-400', 'font-semibold');
              tabsProfileContent[0].classList.add('hidden');
              tabsProfileContent[1].classList.remove('hidden');
          }
      });
  }
  fireTabsProfile();

});