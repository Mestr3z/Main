function noDigits(event) {
  if ("1234567890!@#$%^&*()_~`№;%:?*()-+=,<>/'|/{}[].".indexOf(event.key) != -1)
    event.preventDefault();
}

let phoneInputs = document.querySelectorAll(".telephone");

function mask(event) {
  event.keyCode && (keyCode = event.keyCode);
  let pos = this.selectionStart;
  if (pos < 3) event.preventDefault();

  let matrix = "+7 (___) ___-__-__",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, ""),
    newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });

  i = newValue.indexOf("_");
  if (i != -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }

  let reg = matrix
    .substr(0, this.value.length)
    .replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (
    !reg.test(this.value) ||
    this.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  )
    this.value = newValue;
  if (event.type == "blur" && this.value.length < 5) this.value = "";
}

phoneInputs.forEach(function (phoneInput) {
  phoneInput.addEventListener("input", mask, false);
  phoneInput.addEventListener("focus", mask, false);
  phoneInput.addEventListener("blur", mask, false);
  phoneInput.addEventListener("keydown", mask, false);
  phoneInput.addEventListener("mouseup", (event) => {
    event.preventDefault();
    if (phoneInput.value.length < 4) {
      phoneInput.setSelectionRange(4, 4);
    } else {
      phoneInput.setSelectionRange(
        phoneInput.value.length,
        phoneInput.value.length
      );
    }
  });
});



document.addEventListener("input", function () {

  const button = document.querySelector(".querstion__remaining-questions_button");
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  const nameInput = document.querySelector(".question__remaining-questions_input").value.trim();
  const telInput = document.getElementById("tel").value.trim();
  
  console.log("Name:", nameInput, "Phone:", telInput);

  if (phonePattern.test(telInput) && nameInput !== "") {
      button.disabled = false;
  } else {
      button.disabled = true;
  }
});



function toggleMenu() {

  const menu = document.querySelector('.menu');
  const body = document.body;
  menu.classList.toggle('active');

  const burger = document.querySelector('.header__burger');
  burger.classList.toggle('cross');

  body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

document.addEventListener('click', function(event) {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.header__burger');

  if (!menu.contains(event.target) && !burger.contains(event.target) && menu.classList.contains('active')) {
      menu.classList.remove('active');
      burger.classList.remove('cross');
      
  }
});

document.addEventListener('keydown', function(event) {
  const menu = document.querySelector('.menu');
  const body = document.body;
  const burger = document.querySelector('.header__burger');

  if (event.key === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
      burger.classList.remove('cross');
      body.style.overflow = '';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const blocks = Array.from(document.querySelectorAll('.advantages__block'));
  const container = document.querySelector('.advantages__flex');
  
  document.getElementById('slideRight').addEventListener('click', slideRight);
  document.getElementById('slideLeft').addEventListener('click', slideLeft);

  function slideRight() {
      const firstBlock = blocks.shift();
      blocks.push(firstBlock);
      container.appendChild(firstBlock);
      adjustVisibleBlocks();
  }

  function slideLeft() {
      const lastBlock = blocks.pop();
      blocks.unshift(lastBlock);
      container.insertBefore(lastBlock, container.firstChild);
      adjustVisibleBlocks();
  }

  function adjustVisibleBlocks() {
      let blocksToShow;
      if (window.innerWidth >= 1221) {
          blocksToShow = 5;
      } else if (window.innerWidth >= 769) {
          blocksToShow = 4;
      } else if (window.innerWidth >= 536) {
          blocksToShow = 3;
      } else if (window.innerWidth >= 450) {
          blocksToShow = 2;
      } else if (window.innerWidth <= 450){
          blocksToShow = 1;
      }

      blocks.forEach(block => block.style.display = 'none');
      for (let i = 0; i < blocksToShow; i++) {
          blocks[i].style.display = 'flex';
      }
  }




  let touchStartX = null;

  container.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].clientX;
  });

  container.addEventListener('touchend', function(event) {
    handleSwipe(event.changedTouches[0].clientX);
  });

  function handleSwipe(touchEndX) {
    if (touchStartX === null) {
      return;
    }
    const SWIPE_THRESHOLD = 100;
    if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
      slideRight();
    } else if (touchEndX > touchStartX + SWIPE_THRESHOLD) {
      slideLeft();
    
    }
    touchStartX = null;
  }

  adjustVisibleBlocks();
  window.addEventListener('resize', adjustVisibleBlocks);
});



document.addEventListener("DOMContentLoaded", function() {
  let headers = document.querySelectorAll('.column__header');

  headers.forEach(function(header) {
      header.addEventListener('click', function() {
          if (this.nextElementSibling.style.display === 'block' || !this.nextElementSibling.style.display) {
              this.nextElementSibling.style.display = 'block';
              header.querySelector(".footer__down").style.transform = "rotate(180deg)";
          } else {
              this.nextElementSibling.style.display = 'none';
              header.querySelector(".footer__down").style.transform = "rotate(0deg)";
          }
      });
  });
});

function validateInputs(nameInput, phoneInput, submitButton) {
  function validate() {
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    const nameValue = nameInput.value.trim();
    const telValue = phoneInput.value.trim();
    
    if (phonePattern.test(telValue) && nameValue !== "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
  }

  nameInput.addEventListener("input", validate);
  phoneInput.addEventListener("input", validate);
}



document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");

  menuButton.addEventListener("click", function () {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
                  <button class="popup__close-btn" id="closeButton"></button>
                  <h2 class="popup__title">Заказать звонок</h2>
                  <p class="popup__text">Оставьте свой номер, мы перезвоним в ближайшее время.</p>
                  <p class="popup__input_title">Как к Вам обращаться</p>
                  <input class="popup__input" type="text" id="popupNameInput" placeholder="Введите Ваше имя">
                  <p class="popup__input_title">Ваш номер телефона *</p>
                  <input class="popup__input" type="tel" id="popupTel" placeholder="+7 (___) ___-__-__" required>
                  <p class="popup__text_rules">Отправляя данные, Вы соглашаетесь с</p>
                  <a href="#" class="popup__link">Правилами обработки персональных данных</a>
                  <button class="popup__button" id="popupSubmitButton" disabled>ОТПРАВИТЬ</button>
              `;

    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);

    const nameInput = document.getElementById("popupNameInput");
    const phoneInput = document.getElementById("popupTel");
    const submitButton = document.getElementById("popupSubmitButton");

    nameInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    });

    phoneInput.addEventListener("input", mask);
    phoneInput.addEventListener("focus", mask);
    phoneInput.addEventListener("blur", mask);

    validateInputs(nameInput, phoneInput, submitButton);

    function closePopup() {
      const popupContainer = document.querySelector(".popup-container");
      if (popupContainer) {
        document.body.removeChild(popupContainer);
        document.body.style.overflow = "auto";
      }
    }

    const closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", closePopup);

    submitButton.addEventListener("click", function () {
      closePopup();
    });

    window.addEventListener("click", function (event) {
      if (event.target === popupContainer) {
        closePopup();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePopup();
      }
    });

    document.body.style.overflow = "hidden";
  });
});

function noDigits(event) {
  if ("1234567890!@#$%^&*()_~`№;%:?*()-+=,<>/'|/{}[].".indexOf(event.key) != -1)
    event.preventDefault();
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submitButton2");
  const nameInput = document.querySelector(".second__name");
  const telInput = document.getElementById("tel2");

  function noDigits(event) {
      if ("1234567890!@#$%^&*()_~`№;%:?*()-+=,<>/'|/{}[].".indexOf(event.key) != -1)
          event.preventDefault();
  }

  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    let pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
  
    let matrix = "+7 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
  
    i = newValue.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }
  
    let reg = matrix
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    )
      this.value = newValue;
    if (event.type == "blur" && this.value.length < 5) this.value = "";
  }

  function validateForm() {
      const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      const name = nameInput.value.trim();
      const tel = telInput.value.trim();
      button.disabled = !(phonePattern.test(tel) && name !== "");
  }


  ["input", "focus", "blur", "keydown", "mouseup"].forEach(ev => {
      telInput.addEventListener(ev, mask);
  });


  nameInput.addEventListener("keydown", noDigits);

  [nameInput, telInput].forEach(input => {
      input.addEventListener("input", validateForm);
  });

  document.querySelector(".querstion__remaining-questions_form").addEventListener("submit", function(e){
      e.preventDefault();
      alert("Форма валидирована и готова к отправке.");
  });
});


document.addEventListener("DOMContentLoaded", function() {
  let firstList = document.querySelector('.menu__first-list');
  let secondList = document.querySelector('.menu__second-list');
  let firstSubmenu = document.querySelector('.submenu__first-list');
  let secondSubmenu = document.querySelector('.submenu__second-list');
  let menuDown = document.querySelector('.menu__down');

  const firstDownArrow = firstList.querySelector('.menu__down');
  const secondDownArrow = secondList.querySelector('.menu__down');

  const toggleSubmenu = (submenu, arrow) => {
    submenu.classList.toggle('active');
    arrow.style.transform = arrow.style.transform ? '' : 'rotate(180deg)';
};

const manageSubmenuEvents = () => {
    if(window.innerWidth <= 960) {
        // Добавляем событие клика для мобильных версий
        firstList.onclick = () => toggleSubmenu(firstSubmenu, firstDownArrow);
        secondList.onclick = () => toggleSubmenu(secondSubmenu, secondDownArrow);

        // Добавляем событие клика по документу для закрытия меню при клике вне его
        document.onclick = (e) => {
            if (!firstList.contains(e.target) && !firstSubmenu.contains(e.target)) {
                firstSubmenu.classList.remove('active');
                firstDownArrow.style.transform = '';
            }
            if (!secondList.contains(e.target) && !secondSubmenu.contains(e.target)) {
                secondSubmenu.classList.remove('active');
                secondDownArrow.style.transform = '';
            }
        }
    } else {
        // Убираем обработчики событий для десктопа, так как мы используем hover в CSS
        firstList.onclick = null;
        secondList.onclick = null;
        document.onclick = null;
    }
};

  manageSubmenuEvents();

  window.addEventListener('resize', manageSubmenuEvents);
});