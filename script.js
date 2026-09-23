document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Мобильное меню (Hamburger Toggle)
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });

        // Закрывать меню при клике на любой пункт
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 2. Изменение шапки при скролле и подсветка активных пунктов
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Тень для шапки
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // ScrollSpy (подсветка разделов в меню)
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 3. Обработка формы контактов
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            /* 
               ИЗМЕНИТЬ: Здесь можно добавить реальную отправку данных 
               через fetch() на ваш бэкенд или сервисы вроде EmailJS / Formspree.
            */

            // Показываем уведомление об успешной отправке
            formFeedback.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
            formFeedback.className = 'form-feedback success';
            
            // Очищаем форму
            contactForm.reset();

            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                formFeedback.style.display = 'none';
                formFeedback.className = 'form-feedback';
            }, 5000);
        });
    }

    // ==========================================================================
    // 4. Кнопки быстрого выбора мероприятия
    // ==========================================================================
    const registerButtons = document.querySelectorAll('.register-btn');
    const subjectSelect = document.getElementById('subject');

    registerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventTitle = button.getAttribute('data-event');
            
            // Плавный скролл к контактной форме
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

            // Автовыбор темы "Вопрос по мероприятию"
            if (subjectSelect) {
                subjectSelect.value = 'event';
            }

            // Добавление темы в поле сообщения
            const messageArea = document.getElementById('message');
            if (messageArea) {
                messageArea.value = `Здравствуйте! Я хочу зарегистрироваться на мероприятие: "${eventTitle}".`;
                messageArea.focus();
            }
        });
    });

    // ==========================================================================
    // 5. Динамический год в подвале
    // ==========================================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});