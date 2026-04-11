/**
 * Business Bangla - Dual-Mode Auth UI Logic
 * Handles the sliding animation and state swapping for the unified Login/Register page.
 */

const AuthUI = {
    init: function() {
        const container = document.getElementById('auth-container');
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const blobWrapper = document.getElementById('blob-wrapper');
        const pupils = document.querySelectorAll('.pupil');

        if (!container || !signUpButton || !signInButton) return;

        // 1. Mouse Tracking & Character Tilt
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const windowWidth = window.innerWidth;

            // Tilt Blobs towards mouse
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach(blob => {
                const rect = blob.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                
                // Calculate rotation based on X distance (subtle 8deg max)
                const distanceX = mouseX - centerX;
                const tilt = Math.min(8, Math.max(-8, distanceX / (windowWidth / 15)));
                blob.style.transform = `rotate(${tilt}deg)`;
            });

            // Tracking Pupils
            pupils.forEach(pupil => {
                const rect = pupil.getBoundingClientRect();
                const pupilCenterX = rect.left + rect.width / 2;
                const pupilCenterY = rect.top + rect.height / 2;

                const angle = Math.atan2(mouseY - pupilCenterY, mouseX - pupilCenterX);
                const distance = Math.min(4, Math.hypot(mouseX - pupilCenterX, mouseY - pupilCenterY) / 50);

                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                pupil.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // 2. Input Focus Reactions
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (input.type === 'password') {
                    blobWrapper.classList.add('eyes-closed');
                    blobWrapper.classList.remove('eyes-social');
                } else if (input.id.includes('email')) {
                    blobWrapper.classList.add('eyes-social');
                    blobWrapper.classList.remove('eyes-closed');
                } else {
                    blobWrapper.classList.remove('eyes-closed', 'eyes-social');
                }
            });
            input.addEventListener('blur', () => {
                blobWrapper.classList.remove('eyes-closed', 'eyes-social');
            });
        });

        // 3. Panel Switching
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
            this.updateURL('register');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
            this.updateURL('login');
        });

        // Check URL for mode
        const params = new URLSearchParams(window.location.search);
        if (params.get('mode') === 'register' || window.location.pathname.includes('register.html')) {
            container.classList.add("right-panel-active");
        }
    },

    triggerError: function() {
        const wrapper = document.getElementById('blob-wrapper');
        if (wrapper) {
            wrapper.classList.add('shake');
            setTimeout(() => wrapper.classList.remove('shake'), 800);
        }
    },

    updateURL: function(mode) {
        const newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?mode=' + mode;
        window.history.pushState({ path: newURL }, '', newURL);
    }
};

document.addEventListener('DOMContentLoaded', () => AuthUI.init());
