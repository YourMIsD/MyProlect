window.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close'),
    menuList = document.querySelectorAll('.menu__list');

    
        hamburger.addEventListener('click', ()=> {
             menu.classList.add('active');
        });

        close.addEventListener('click', ()=> {
            menu.classList.remove('active');
        });

        menu.addEventListener('click', (e)=> {
            menu.classList.remove('active');
        });

       


    

        //timer
    
        const deadline = '2022-05-20';
    
        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor((t / ( 1000 * 60 * 60 * 24))),
                seconds = Math.floor((t / 1000 ) % 60),
                minutes = Math.floor((t / 1000 / 60 ) % 60),
                hours = Math.floor((t / (1000 * 60 * 60) % 24));
    
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function getZero(num){
            if (num >= 0 && num < 10) { 
                return '0' + num;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime) {
    
            const timer = document.querySelector(selector),
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }
        setClock('.timer', deadline);
    
        // modal 
    
        const  modalTrigger = document.querySelectorAll('[data-modal]'),
               modal = document.querySelector('.modal'),
               modalCloseBtn = document.querySelector('[data-close]');
    
        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
        }
    
        modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal);
        });
    
        function closeModal(){
                modal.classList.add('hide');
                modal.classList.remove('show');
                document.body.style.overflow = '';
        }
    
        modalCloseBtn.addEventListener('click', closeModal);
    
        // если тыкаешь на подложку то модальное окно закрывется
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        // закрывается модальное окно на кнопку event.code хороший сайт
        document.addEventListener('keydown', (e) => {
            if (e.code === "KeyQ" && modal.classList.contains('show')) {
                closeModal();
            }
        });
    
        const modalTimerId = setInterval(openModal, 5000);
    
        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
    
        window.addEventListener('scroll', showModalByScroll);
 
    });