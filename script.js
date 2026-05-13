
    // 1. HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    // 2. SCROLL REVEAL
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. SKILL BARS
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-bar-fill');
          if (fill) setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 200);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

    // 4. COUNTER ANIMATION
    function animateCounter(el, target, duration = 1500) {
      let start = 0;
      const step = target / (duration / 16);
      function update() {
        start += step;
        if (start < target) {
          el.textContent = Math.floor(start) + '+';
          requestAnimationFrame(update);
        } else {
          el.textContent = target + '+';
        }
      }
      update();
    }
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('[data-count]').forEach(el => {
            animateCounter(el, parseInt(el.dataset.count));
          });
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(document.getElementById('hero'));

    // 5. NAVBAR SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
    });

    // 6. FORM SUBMIT
    function handleFormSubmit(e) {
      e.preventDefault();
      const btn = e.target;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--green-dark)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = 'var(--green)';
        btn.disabled = false;
      }, 3000);
    }

    // 7. ACTIVE NAV LINK
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-btn)');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--green)' : 'var(--muted)';
      });
    });

    // 8. TYPEWRITER
    const roles = ['Web Developer.', 'Frontend Engineer.', 'UI/UX Enthusiast.'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typeEl = document.getElementById('typewriterText');
    function typeWriter() {
      const current = roles[roleIndex];
      if (isDeleting) { charIndex--; typeEl.textContent = current.substring(0, charIndex); }
      else { charIndex++; typeEl.textContent = current.substring(0, charIndex); }
      let delay = isDeleting ? 60 : 100;
      if (!isDeleting && charIndex === current.length) { delay = 1800; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
      setTimeout(typeWriter, delay);
    }
    setTimeout(typeWriter, 800);
