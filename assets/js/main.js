const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
        revealEls.forEach(el => observer.observe(el));
        document.querySelectorAll('#accueil .reveal').forEach(el => el.classList.add('visible'));
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;
                const target = document.querySelector(targetId);
                if (!target) return;
                event.preventDefault();
                const header = document.querySelector('header');
                const offset = header ? header.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        function setMobileMenuOpen(isOpen) {
            menu.classList.toggle('open', isOpen);
            btn.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        btn.addEventListener('click', () => {
            const isOpen = !menu.classList.contains('open');
            setMobileMenuOpen(isOpen);
        });

        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobileMenuOpen(false)));

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && menu.classList.contains('open')) {
                setMobileMenuOpen(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('open')) {
                setMobileMenuOpen(false);
            }
        });
        function clearAllCookies() {
            const cookies = document.cookie ? document.cookie.split(';') : [];
            const hostParts = window.location.hostname.split('.');
            const domains = [window.location.hostname];

            for (let index = 1; index < hostParts.length; index += 1) {
                domains.push(`.${hostParts.slice(index).join('.')}`);
            }

            cookies.forEach((cookie) => {
                const name = cookie.split('=')[0].trim();
                domains.forEach((domain) => {
                    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
                });
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            });
        }

        function blockFutureCookies() {
            try {
                const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
                if (descriptor && descriptor.configurable && descriptor.get) {
                    Object.defineProperty(document, 'cookie', {
                        configurable: true,
                        get: descriptor.get.bind(document),
                        set: () => {
                        }
                    });
                }
            } catch (_) {
            }
        }

        function applyDeclinedState() {
            clearAllCookies();
            blockFutureCookies();
        }

        document.addEventListener("DOMContentLoaded", function() {
            const banner = document.getElementById('loi-25-popup');
            const acceptBtn = document.getElementById('btn-accept-cookies');
            const declineBtn = document.getElementById('btn-decline-cookies');
            const consent = localStorage.getItem('cookie-consent');

            if (consent === 'declined') {
                applyDeclinedState();
            }
            setTimeout(() => banner.classList.add('show'), 1200);

            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'accepted');
                banner.classList.remove('show');
            });

            declineBtn.addEventListener('click', () => {
                localStorage.setItem('cookie-consent', 'declined');
                applyDeclinedState();
                banner.classList.remove('show');
            });
        });
        function openPrivacyModal() {
            const modal = document.getElementById('privacy-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
        function closePrivacyModal() {
            const modal = document.getElementById('privacy-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
        document.getElementById('privacy-modal').addEventListener('click', function(e) {
            if (e.target === this) closePrivacyModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closePrivacyModal();
        });
