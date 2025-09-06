// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialização das funcionalidades
    initializeNavigation();
    initializeForms();
    initializeAnimations();
    initializeDateValidation();
    initializeFormValidation();
    initializeMobileMenu();
    
    console.log('Site do Posto de Saúde carregado com sucesso!');
});

// Navegação suave entre seções
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu mobile responsivo
function initializeMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Criar botão do menu mobile se não existir
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 10px;
        `;
        
        header.querySelector('.container').appendChild(mobileMenuBtn);
        
        // Toggle do menu mobile
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
        });
    }
    
    // Estilo responsivo para o menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #1e3a8a;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            nav.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            nav ul {
                flex-direction: column;
                padding: 20px;
                gap: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicialização dos formulários
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const appointmentForm = document.getElementById('appointment-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentForm);
    }
}

// Manipulador do formulário de contato
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simular envio do formulário
    showLoadingState(e.target);
    
    setTimeout(() => {
        showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        e.target.reset();
        hideLoadingState(e.target);
    }, 2000);
}

// Manipulador do formulário de agendamento
function handleAppointmentForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!validateAppointmentForm(data)) {
        return;
    }
    
    // Simular envio do formulário
    showLoadingState(e.target);
    
    setTimeout(() => {
        showSuccessMessage('Solicitação de agendamento enviada! Você receberá uma confirmação em até 24 horas.');
        e.target.reset();
        hideLoadingState(e.target);
    }, 2500);
}

// Validação do formulário de contato
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Email inválido');
    }
    
    if (!data.subject) {
        errors.push('Selecione um assunto');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// Validação do formulário de agendamento
function validateAppointmentForm(data) {
    const errors = [];
    
    if (!data['appointment-name'] || data['appointment-name'].trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data['appointment-cpf'] || !isValidCPF(data['appointment-cpf'])) {
        errors.push('CPF inválido');
    }
    
    if (!data['appointment-email'] || !isValidEmail(data['appointment-email'])) {
        errors.push('Email inválido');
    }
    
    if (!data['appointment-phone'] || data['appointment-phone'].length < 10) {
        errors.push('Telefone inválido');
    }
    
    if (!data['appointment-birth']) {
        errors.push('Data de nascimento é obrigatória');
    }
    
    if (!data['appointment-service']) {
        errors.push('Selecione um serviço');
    }
    
    if (!data['appointment-date']) {
        errors.push('Selecione uma data');
    }
    
    if (!data['appointment-time']) {
        errors.push('Selecione um horário');
    }
    
    if (!data['appointment-terms']) {
        errors.push('Você deve concordar com os termos de uso');
    }
    
    // Validar se a data não é no passado
    if (data['appointment-date']) {
        const selectedDate = new Date(data['appointment-date']);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.push('A data deve ser hoje ou no futuro');
        }
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validação básica de CPF
function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.length === 11 && !/^(\d)\1{10}$/.test(cpf);
}

// Mostrar estado de carregamento
function showLoadingState(form) {
    const submitBtn = form.querySelector('.submit-button');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        submitBtn.style.opacity = '0.7';
    }
}

// Esconder estado de carregamento
function hideLoadingState(form) {
    const submitBtn = form.querySelector('.submit-button');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.id === 'contact-form' ? 'Enviar Mensagem' : 'Solicitar Agendamento';
        submitBtn.style.opacity = '1';
    }
}

// Mostrar mensagem de sucesso
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// Mostrar mensagem de erro
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        warning: '#ff9800'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Permitir fechar clicando
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Animações de entrada
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.service-card, .contact-card, .info-card, .tip-card, .faq-item, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Validação de data em tempo real
function initializeDateValidation() {
    const dateInput = document.getElementById('appointment-date');
    
    if (dateInput) {
        // Definir data mínima como hoje
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Validar quando a data muda
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showErrorMessage('Por favor, selecione uma data futura.');
                this.value = '';
            }
            
            // Verificar se é fim de semana (opcional - pode ser removido se atenderem)
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0) { // Domingo
                showNotification('Atenção: Não atendemos aos domingos. Escolha outro dia.', 'warning');
            }
        });
    }
}

// Validação de formulário em tempo real
function initializeFormValidation() {
    // Máscara para CPF
    const cpfInput = document.getElementById('appointment-cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            this.value = value;
        });
    }
    
    // Máscara para telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            this.value = value;
        });
    });
    
    // Validação de email em tempo real
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#f44336';
                showNotification('Email inválido', 'error');
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
}

// Funcionalidade de scroll suave para links internos
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Funcionalidade para destacar seção ativa na navegação
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Funcionalidade de busca (se necessário no futuro)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.service-card, .faq-item');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }
}

// Funcionalidade para voltar ao topo
function addBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4caf50;
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/esconder baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade de clique
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar botão de voltar ao topo
document.addEventListener('DOMContentLoaded', addBackToTopButton);

// Funcionalidade para melhorar a acessibilidade
function improveAccessibility() {
    // Adicionar skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Adicionar ID ao main se não existir
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
}

// Inicializar melhorias de acessibilidade
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Funcionalidade para salvar dados do formulário localmente (opcional)
function saveFormData() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Carregar dados salvos
            const savedValue = localStorage.getItem(`form_${input.name}`);
            if (savedValue && input.type !== 'password') {
                input.value = savedValue;
            }
            
            // Salvar dados quando mudarem
            input.addEventListener('input', function() {
                if (this.type !== 'password') {
                    localStorage.setItem(`form_${this.name}`, this.value);
                }
            });
        });
        
        // Limpar dados salvos quando o formulário for enviado com sucesso
        form.addEventListener('submit', function() {
            setTimeout(() => {
                inputs.forEach(input => {
                    localStorage.removeItem(`form_${input.name}`);
                });
            }, 3000);
        });
    });
}

// Inicializar salvamento de dados do formulário
document.addEventListener('DOMContentLoaded', saveFormData);

