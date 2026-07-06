(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  }, { passive: true });

  function closeMobileNav() {
    nav.classList.remove('nav--open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown__toggle');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('nav-dropdown--open');
      toggle.setAttribute('aria-expanded', isOpen);

      nav.querySelectorAll('.nav-dropdown').forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('nav-dropdown--open');
          other.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', () => {
    nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      dropdown.classList.remove('nav-dropdown--open');
      dropdown.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
    });
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('nav-dropdown--open');
        dropdown.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });

  function scrollToSignup() {
    const target = document.getElementById('signup');
    if (!target) return;

    const top = window.scrollY + target.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    closeMobileNav();
  }

  document.querySelectorAll('a[href="#signup"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSignup();
    });
  });

  if (window.location.hash === '#signup') {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }

  const signupForm = document.querySelector('.signup__form');
  if (!signupForm) return;

  const phoneInput = document.getElementById('phone');
  const nameInput = document.getElementById('name');
  const directionInput = document.getElementById('direction');
  const PHONE_PREFIX = '+7 (';

  function formatRuPhone(value) {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    const body = digits.slice(1, 11);

    let result = '+7';
    if (!body.length) return PHONE_PREFIX;

    result += ' (' + body.slice(0, 3);
    if (body.length < 3) return result;
    result += ') ' + body.slice(3, 6);
    if (body.length < 6) return result;
    result += '-' + body.slice(6, 8);
    if (body.length < 8) return result;
    return result + '-' + body.slice(8, 10);
  }

  function getPhoneDigits(value) {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    return digits.slice(1, 11);
  }

  function isPhoneComplete(value) {
    return getPhoneDigits(value).length === 10;
  }

  function setFieldError(fieldName, message) {
    const field = signupForm.querySelector(`[data-field="${fieldName}"]`);
    if (!field) return;

    const input = field.querySelector('input');
    const error = field.querySelector('.form-field__error');
    const hasError = Boolean(message);

    field.classList.toggle('form-field--invalid', hasError);
    if (input) input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    if (error) error.textContent = message || '';
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) return 'Укажите фамилию и имя';
    if (value.length < 3) return 'Минимум 3 символа';
    if (!/^[\u0400-\u04FFa-zA-Z\s\-']+$/.test(value)) {
      return 'Используйте только буквы';
    }
    return '';
  }

  function validatePhone() {
    const value = phoneInput.value;
    if (!value || value === PHONE_PREFIX) return 'Укажите номер телефона';
    if (!isPhoneComplete(value)) return 'Введите номер полностью: +7 (___) ___-__-__';
    return '';
  }

  function validateDirection() {
    const value = directionInput.value.trim();
    if (!value) return 'Укажите направление';
    if (value.length < 2) return 'Минимум 2 символа';
    return '';
  }

  function validateBranch() {
    const selected = signupForm.querySelector('input[name="custom_U107705[]"]:checked');
    return selected ? '' : 'Выберите филиал';
  }

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) {
      phoneInput.value = PHONE_PREFIX;
    }
  });

  phoneInput.addEventListener('blur', () => {
    if (phoneInput.value === PHONE_PREFIX) {
      phoneInput.value = '';
    }
  });

  phoneInput.addEventListener('keydown', (e) => {
    const start = phoneInput.selectionStart ?? 0;
    if ((e.key === 'Backspace' || e.key === 'Delete') && start <= PHONE_PREFIX.length) {
      e.preventDefault();
    }
  });

  phoneInput.addEventListener('input', () => {
    const cursorFromEnd = phoneInput.value.length - (phoneInput.selectionStart ?? phoneInput.value.length);
    phoneInput.value = formatRuPhone(phoneInput.value);
    const nextPos = Math.max(PHONE_PREFIX.length, phoneInput.value.length - cursorFromEnd);
    phoneInput.setSelectionRange(nextPos, nextPos);
    setFieldError('phone', '');
  });

  nameInput.addEventListener('input', () => setFieldError('name', ''));
  directionInput.addEventListener('input', () => setFieldError('direction', ''));

  signupForm.querySelectorAll('input[name="custom_U107705[]"]').forEach(radio => {
    radio.addEventListener('change', () => setFieldError('branch', ''));
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = {
      name: validateName(),
      phone: validatePhone(),
      direction: validateDirection(),
      branch: validateBranch()
    };

    Object.entries(errors).forEach(([field, message]) => setFieldError(field, message));

    const firstErrorField = ['name', 'phone', 'direction', 'branch'].find((field) => errors[field]);
    if (firstErrorField) {
      signupForm.querySelector(`[data-field="${firstErrorField}"] input`)?.focus();
    }
  });
})();
