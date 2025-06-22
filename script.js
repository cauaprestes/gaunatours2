document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list li a'); // Seleciona todos os links do menu

    // Toggle do menu hambúrguer
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times'); // Muda ícone para 'X'
    });

    // Fecha o menu ao clicar em um link (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Adicionar classe 'active' ao link do menu ao rolar a página
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 90; // Ajuste para o cabeçalho fixo
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Para o caso da página carregar já em uma seção específica
    // Ou para garantir que o 'home' esteja ativo no início
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(targetId)) {
                    link.classList.add('active');
                }
            });
        }
    } else {
        document.querySelector('.nav-list li a[href="#home"]').classList.add('active');
    }
});