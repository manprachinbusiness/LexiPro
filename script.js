/**
 * Mobile nav — hamburger toggle
 */
function toggleNav() {
    const nav    = document.getElementById('main-nav');
    const toggle = document.getElementById('navToggle');
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
}

function closeNav() {
    const nav    = document.getElementById('main-nav');
    const toggle = document.getElementById('navToggle');
    if (nav) { nav.classList.remove('open'); }
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); }
}

// Close nav when tapping outside it
document.addEventListener('click', function(e) {
    const nav    = document.getElementById('main-nav');
    const toggle = document.getElementById('navToggle');
    if (nav && nav.classList.contains('open') &&
        !nav.contains(e.target) && !toggle.contains(e.target)) {
        closeNav();
    }
});

/**
 * Word Card — Flip
 * Reveals the back of the sample word card and shows swipe actions.
 */
function flipCard() {
    const inner   = document.getElementById('cardInner');
    const actions = document.getElementById('cardActions');
    if (!inner.classList.contains('flipped')) {
        inner.classList.add('flipped');
        actions.style.display = 'flex';
    }
}

/**
 * Word Card — Swipe reaction
 * Simulates the know/learning swipe and shows a reaction message.
 * @param {'know'|'learn'} choice
 */
function swipeCard(choice) {
    const reaction = document.getElementById('swipeReaction');
    const actions  = document.getElementById('cardActions');
    actions.style.display = 'none';
    if (choice === 'know') {
        reaction.style.background = 'rgba(52, 211, 153, 0.1)';
        reaction.style.color      = '#34d399';
        reaction.style.border     = '1px solid rgba(52, 211, 153, 0.25)';
        reaction.textContent      = '✅ Marked as Known — great work! This is exactly how the app works.';
    } else {
        reaction.style.background = 'rgba(251, 191, 36, 0.08)';
        reaction.style.color      = '#fbbf24';
        reaction.style.border     = '1px solid rgba(251, 191, 36, 0.25)';
        reaction.textContent      = '📚 Added to your Learning list — LexiPro will bring this back using spaced repetition.';
    }
    reaction.style.display = 'block';
}

/**
 * Feedback Form Submission
 * Submits feedback via Formspree and shows a success message on completion.
 */
async function submitFeedback() {
    const name    = document.getElementById('feedback-name').value.trim();
    const email   = document.getElementById('feedback-email').value.trim();
    const subject = document.getElementById('feedback-subject').value;
    const message = document.getElementById('feedback-message').value.trim();
    const errorEl = document.getElementById('form-error');
    const btn     = document.getElementById('feedback-submit');

    if (!name || !email || !message) {
        errorEl.style.display = 'block';
        return;
    }
    errorEl.style.display = 'none';

    btn.disabled    = true;
    btn.textContent = 'Sending...';

    try {
        const response = await fetch('https://formspree.io/f/xlgpovap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
            document.getElementById('feedback-form-wrap').style.display = 'none';
            document.getElementById('feedback-success').style.display   = 'block';
        } else {
            throw new Error('Submission failed');
        }
    } catch (err) {
        btn.disabled    = false;
        btn.textContent = 'Send Feedback';
        errorEl.textContent = 'Something went wrong. Please email us directly at manprachinbusiness@gmail.com';
        errorEl.style.display = 'block';
    }
}
