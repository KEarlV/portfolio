/**
 * King Earl B. Vargas Portfolio - Core Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Theme Toggle Management
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const htmlNode = document.documentElement;

    // Load saved theme or default to cyberpunk
    const savedTheme = localStorage.getItem("portfolio-theme") || "cyberpunk";
    htmlNode.setAttribute("data-theme", savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlNode.getAttribute("data-theme");
        const newTheme = currentTheme === "cyberpunk" ? "slate" : "cyberpunk";
        htmlNode.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
    });

    // ----------------------------------------------------
    // 2. Dynamic Typing Effect (Hero Section)
    // ----------------------------------------------------
    const typedRole = document.getElementById("typed-role");
    const roles = [
        "BSIT 3rd Year Standing",
        "DOST-SEI Merit Scholar",
        "Full-Stack Developer",
        "Task Automation Builder",
        "Palawan State University Student"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    // ----------------------------------------------------
    // 3. Interactive Terminal Shell Widget
    // ----------------------------------------------------
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalBody = document.getElementById("terminal-body");
    let cmdHistory = [];
    let historyIndex = -1;

    const COMMAND_DATA = {
        help: `Available commands:
  <span class="term-highlight">whoami</span>      - Prints background profile about me
  <span class="term-highlight">dost</span>        - Details about my DOST-SEI Merit Scholarship
  <span class="term-highlight">education</span>   - Shows academic timeline and majors at PSU
  <span class="term-highlight">projects</span>    - Lists featured applications with technical details
  <span class="term-highlight">certs</span>       - Lists verified academic & technical certifications
  <span class="term-highlight">socials</span>     - Displays interactive links for social networking
  <span class="term-highlight">clear</span>       - Clears console window`,
        
        whoami: `<b>King Earl B. Vargas</b>
--------------------
Role:       BSIT 3rd Year Standing
Affiliation: Palawan State University
Honors:     DOST Scholar (Department of Science and Technology)
Focus:      Automation Scripting, Flask Web Application Architecture, Database Engineering
Bio:        I specialize in turning manual administrative tasks into automated programs. 
            Combining academic IT concepts from PSU with modern development stacks.`,
        
        dost: `<b>DOST-SEI Merit Scholarship Profile</b>
--------------------
Sponsor:    Department of Science and Technology - Science Education Institute (DOST-SEI)
Status:     Merit Scholar (Active Academic Standing)
Impact:     Supported by the Philippine government to pioneer scientific and technological 
            breakthroughs. Engaged in technical initiatives, research integrations, and 
            local development pipelines.`,
        
        education: `<b>Academic Pathway</b>
--------------------
1. Palawan State University (PSU)
   - Degree:  Bachelor of Science in Information Technology (BSIT)
   - Status:  3rd Year Standing
   - Focus:   Systems Analysis, Database Management Systems, Network Engineering
2. Palawan National School (PNS)
   - Course:  Senior High School - STEM Strand (2021 - 2023)
   - Focus:   Science, Technology, Engineering, and Mathematics Foundations`,
        
        projects: `<b>Featured Codebases</b>
--------------------
1. <span class="term-highlight">Flask To-Do List</span>:
   - Backend integration of Python/Flask with SQLite database.
   - User authentication and dynamic state filters.
2. <span class="term-highlight">Admin (Task Automation)</span>:
   - Automation script suites targeting background operations, logs, and DB backups.
3. <span class="term-highlight">Church Management System</span>:
   - Records monitoring portal for membership ledger auditing, scheduling, and metrics.`,

        certs: `<b>Verified Technical Certifications</b>
--------------------
1. <span class="term-highlight">Hardware & Upgrade Support</span> - Cisco Networking Academy
   - Scope: System diagnostics, equipment safety, component upgrading, hardware troubleshooting.
   - Issued: June 17, 2026.
2. <span class="term-highlight">Introduction to CSS</span> - TESDA Online Program
   - Scope: Formal visual box models, CSS selectors, stylesheet cascading rules, responsive grid layouts.
   - Issued: January 4, 2025. Verification Code: RAb3kcYGbO.

* Click the "Certs" badge icon in the navigation dock below to view the visual certificate scans!`,
        
        socials: `<b>Social Links & Contact Channels</b>
--------------------
GitHub:    <a href="https://github.com/KEarlV" target="_blank" style="color:var(--accent-secondary)">github.com/KEarlV</a>
Facebook:  <a href="https://www.facebook.com/kingearl.vargas" target="_blank" style="color:var(--accent-secondary)">facebook.com/kingearl.vargas</a>
Instagram: <a href="https://www.instagram.com/v.ram.page/" target="_blank" style="color:var(--accent-secondary)">instagram.com/v.ram.page</a>
Email:     <a href="mailto:kevargasitsolutions@gmail.com" style="color:var(--accent-secondary)">kevargasitsolutions@gmail.com</a>
Phone:     09707601013 (SMS / Call)`
    };

    // Auto-focus terminal on click inside terminal body
    terminalBody.addEventListener("click", () => {
        terminalInput.focus();
    });

    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const rawInput = terminalInput.value;
            const cleanInput = rawInput.trim().toLowerCase();
            
            // Add to history
            if (rawInput.trim() !== "") {
                cmdHistory.push(rawInput);
                historyIndex = cmdHistory.length;
            }

            // Print the input line
            const printLine = document.createElement("div");
            printLine.className = "terminal-line";
            printLine.innerHTML = `<span class="terminal-prompt">guest@kingearl:~$</span> ${rawInput}`;
            terminalOutput.appendChild(printLine);

            // Print the output
            if (cleanInput === "clear") {
                terminalOutput.innerHTML = "";
            } else if (cleanInput in COMMAND_DATA) {
                const outLine = document.createElement("div");
                outLine.className = "terminal-line";
                outLine.innerHTML = COMMAND_DATA[cleanInput].replace(/\n/g, "<br>");
                terminalOutput.appendChild(outLine);
            } else if (cleanInput === "") {
                // Do nothing
            } else {
                const errLine = document.createElement("div");
                errLine.className = "terminal-line";
                errLine.innerHTML = `Command not found: <span style="color:#ef4444">${rawInput}</span>. Type <span class="term-highlight">help</span> for commands.`;
                terminalOutput.appendChild(errLine);
            }

            // Reset input
            terminalInput.value = "";
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                terminalInput.value = cmdHistory[historyIndex];
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                terminalInput.value = cmdHistory[historyIndex];
            } else {
                historyIndex = cmdHistory.length;
                terminalInput.value = "";
            }
        }
    });

    // ----------------------------------------------------
    // 4. DOST Stipend Simulator Logic
    // ----------------------------------------------------
    const monthlyMonths = document.getElementById("monthly-months");
    const bookAllowance = document.getElementById("book-allowance");
    const connectivityAllowance = document.getElementById("connectivity-allowance");
    const estimatedTotal = document.getElementById("estimated-total");

    function calculateStipend() {
        const baseRate = 8000;
        const semBookRate = 5000;
        const semConnectRate = 1000;

        const months = parseInt(monthlyMonths.value) || 0;
        let total = months * baseRate;

        if (bookAllowance.checked) {
            total += semBookRate;
        }
        if (connectivityAllowance.checked) {
            total += semConnectRate;
        }

        estimatedTotal.textContent = `₱${total.toLocaleString()}`;
    }

    monthlyMonths.addEventListener("input", calculateStipend);
    bookAllowance.addEventListener("change", calculateStipend);
    connectivityAllowance.addEventListener("change", calculateStipend);
    calculateStipend();

    // ----------------------------------------------------
    // 5. Palawan Live Weather & Clock API
    // ----------------------------------------------------
    const weatherDisplay = document.getElementById("weather-display");
    const localTimeEl = document.getElementById("local-time");

    // Live clock update for PST (Philippine Standard Time)
    function updateClock() {
        const options = {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        localTimeEl.textContent = formatter.format(new Date());
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Fetch Weather for PSU Palawan (Puerto Princesa: Lat 9.7392, Lon 118.7353)
    async function fetchWeather() {
        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=9.7392&longitude=118.7353&current_weather=true";
            const res = await fetch(url);
            if (!res.ok) throw new Error("API network issue");
            const data = await res.json();
            
            const temp = data.current_weather.temperature;
            const wind = data.current_weather.windspeed;
            const wcode = data.current_weather.weathercode;
            
            // Map simple weather codes to descriptors
            let weatherText = "Sunny";
            if (wcode >= 1 && wcode <= 3) weatherText = "Partly Cloudy";
            else if (wcode >= 45 && wcode <= 48) weatherText = "Foggy";
            else if (wcode >= 51 && wcode <= 67) weatherText = "Rainy";
            else if (wcode >= 71 && wcode <= 82) weatherText = "Showers/Snow";
            else if (wcode >= 95) weatherText = "Thunderstorm";

            weatherDisplay.innerHTML = `
                <div class="weather-stats">
                    <div class="weather-icon-temp">
                        <span style="font-size:2rem">⛅</span>
                        <span class="weather-temp">${temp}°C</span>
                    </div>
                    <div class="weather-info-col">
                        <span>Condition: <strong>${weatherText}</strong></span>
                        <span>Wind: <strong>${wind} km/h</strong></span>
                        <span>Region: <strong>Puerto Princesa</strong></span>
                    </div>
                </div>
            `;
        } catch (err) {
            weatherDisplay.innerHTML = `<span style="font-size:0.85rem;color:var(--text-muted)">Palawan weather currently unavailable</span>`;
        }
    }
    fetchWeather();
    // Refresh weather every 10 minutes
    setInterval(fetchWeather, 600000);

    // ----------------------------------------------------
    // 6. Visitor Guestbook (Persistent Cloud KV Store - KVdb)
    // ----------------------------------------------------
    const guestbookForm = document.getElementById("guestbook-form");
    const gbName = document.getElementById("gb-name");
    const gbMessage = document.getElementById("gb-message");
    const guestbookMessages = document.getElementById("guestbook-messages");
    const kvdbUrl = "https://kvdb.io/77rKGPm6ZGx2Kk4orN4TRx/guestbook";

    async function loadGuestbook() {
        try {
            guestbookMessages.innerHTML = `<div class="loading-spinner">Loading signatures...</div>`;
            const response = await fetch(kvdbUrl);
            
            if (response.status === 404) {
                renderGuestbook([]);
                return;
            }
            
            if (!response.ok) throw new Error("Database offline");
            
            const messages = await response.json();
            renderGuestbook(messages);
        } catch (err) {
            guestbookMessages.innerHTML = `<div class="empty-messages" style="color:#ef4444">Unable to load guestbook.</div>`;
        }
    }

    function renderGuestbook(messages) {
        if (!messages || messages.length === 0) {
            guestbookMessages.innerHTML = `<div class="empty-messages">No signatures yet. Be the first!</div>`;
            return;
        }

        guestbookMessages.innerHTML = messages.map(msg => `
            <div class="gb-entry">
                <span class="gb-time">${msg.time}</span>
                <div class="gb-author">${escapeHTML(msg.name)}</div>
                <div class="gb-text">${escapeHTML(msg.text)}</div>
            </div>
        `).join('');
        
        guestbookMessages.scrollTop = 0;
    }

    guestbookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = gbName.value.trim();
        const text = gbMessage.value.trim();
        
        if (name === "" || text === "") return;

        const submitBtn = guestbookForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Signing...";

        const timestamp = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const newMsg = { name, text, time: timestamp };
        
        try {
            let messages = [];
            const getRes = await fetch(kvdbUrl);
            if (getRes.ok && getRes.status !== 404) {
                messages = await getRes.json();
            }
            
            messages.unshift(newMsg);
            
            const postRes = await fetch(kvdbUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messages)
            });
            
            if (!postRes.ok) throw new Error("Failed to save entry");
            
            gbName.value = "";
            gbMessage.value = "";
            renderGuestbook(messages);
        } catch (err) {
            alert("Could not save signature. Please try again.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign Guestbook";
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
    
    loadGuestbook();

    // ----------------------------------------------------
    // 7. Contact Form Handling
    // ----------------------------------------------------
    // 7. Contact Form Handling (Formspree Integration)
    // ----------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");
    
    // Add your Formspree ID here to receive real emails (e.g. "xndkjnqr")
    // Register free at https://formspree.io to get one.
    const FORMSPREE_ID = "mnjyyqva"; 

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (name === "" || email === "" || subject === "" || message === "") {
            formFeedback.textContent = "Please fill in all details.";
            formFeedback.className = "form-feedback error";
            return;
        }

        formFeedback.textContent = "Sending message...";
        formFeedback.className = "form-feedback";
        const submitBtn = contactForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;

        if (FORMSPREE_ID && FORMSPREE_ID !== "YOUR_FORMSPREE_ID") {
            try {
                const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });

                if (response.ok) {
                    formFeedback.textContent = `Thank you, ${name}! Your inquiry has been sent successfully.`;
                    formFeedback.className = "form-feedback success";
                    contactForm.reset();
                } else {
                    throw new Error("Formspree response error");
                }
            } catch (err) {
                formFeedback.textContent = "Oops! There was a problem sending your message.";
                formFeedback.className = "form-feedback error";
            } finally {
                submitBtn.disabled = false;
            }
        } else {
            setTimeout(() => {
                formFeedback.innerHTML = `Simulation Mode: Thank you, ${name}! To receive real emails to <i>kevargasitsolutions@gmail.com</i>, register a free form at <a href="https://formspree.io" target="_blank" style="color:var(--accent-secondary)">formspree.io</a> and update the <b>FORMSPREE_ID</b> in <b>app.js</b>.`;
                formFeedback.className = "form-feedback success";
                contactForm.reset();
                submitBtn.disabled = false;
            }, 1200);
        }
    });

    // ----------------------------------------------------
    // 8. Scroll-Driven Reveal Animations (Intersection Observer)
    // ----------------------------------------------------
    const sections = document.querySelectorAll(".section-container, .hero-section");
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    sections.forEach(sec => {
        sec.classList.add("fade-in-section");
        revealObserver.observe(sec);
    });

    // ----------------------------------------------------
    // 9. Extra Polish: Card Mouse Tilt Effect
    // ----------------------------------------------------
    const tiltCards = document.querySelectorAll("[data-tilt]");
    
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // ----------------------------------------------------
    // 10. Certifications Viewer Modal
    // ----------------------------------------------------
    const certModal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");

    window.openCertModal = function(imgSrc, captionText) {
        modalImg.src = imgSrc;
        modalCaption.textContent = captionText;
        certModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Disable scroll when modal is open
    };

    window.closeCertModal = function() {
        certModal.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scroll
    };

    // Close modal on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certModal.classList.contains("active")) {
            window.closeCertModal();
        }
    });
});
