(() => {
    const cfg = {
        phaseThreshold: 40,
        viewportMidRatio: 0.45,
        fadeThreshold: 0.25,
    };
    
    const dom = {
        thread: document.getElementById('thread'),
        scrollPercent: document.getElementById('scroll-percent'),
        phaseDisplay: document.getElementById('phase-display'),
        sectionDisplay: document.getElementById('section-display'),
        navLinks: Array.from(document.querySelectorAll('nav a')),
        sections: Array.from(document.querySelectorAll('section')),
        fadeTargets: document.querySelectorAll('.fade-in'),
        section2: document.getElementById('section2'),
    };
    
    if (!dom.thread) return;
    
    const sectionCodes = new Map(
        dom.navLinks.map(link => {
            const id = link.getAttribute('href').replace('#', '');
            return [id, link.dataset.section || 'HERO'];
        })
    );
    
    const state = { scrollProgress: 0, ticking: false };
    
    const fadeObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: cfg.fadeThreshold }
    );
    
    dom.fadeTargets.forEach(el => fadeObserver.observe(el));
    
    function computeScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    }
    
    function updateScrollMetrics(progress) {
        dom.thread.style.height = `${progress}%`;
        dom.scrollPercent.textContent = `SCROLL: ${Math.round(progress)}%`;
    }
    
    function updatePhase(progress) {
        const viewportMid = window.innerHeight * cfg.viewportMidRatio;
        const rect = dom.section2?.getBoundingClientRect();
        // Switch theme as soon as SECTION 02 marker crosses into view.
        const isPhaseB = rect ? rect.top <= viewportMid : progress > cfg.phaseThreshold;
        document.body.classList.toggle('phase-b', isPhaseB);
        dom.phaseDisplay.textContent = `PHASE: ${isPhaseB ? 'B' : 'A'}`;
    }
    
    function updateNavState() {
        let currentSection = 'HERO';
        const viewportMid = window.innerHeight * cfg.viewportMidRatio;
        
        dom.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
                currentSection = sectionCodes.get(section.id) || section.id.toUpperCase();
                dom.navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
                });
            }
        });
        
        dom.sectionDisplay.textContent = `SEC: ${currentSection}`;
    }
    
    function onScroll() {
        if (state.ticking) return;
        state.ticking = true;
        
        window.requestAnimationFrame(() => {
            state.scrollProgress = computeScrollProgress();
            updateScrollMetrics(state.scrollProgress);
            updatePhase(state.scrollProgress);
            updateNavState();
            state.ticking = false;
        });
    }
    
    function bindNav() {
        dom.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    function init() {
        bindNav();
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();
