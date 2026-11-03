document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ICEMAX WEBSITE
       MAIN JAVASCRIPT
    ===================================================== */


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const loader = document.getElementById("pageLoader");
    const loaderFill = document.getElementById("loaderFill");
    const loaderPercent = document.getElementById("loaderPercent");
    const loaderStatus = document.getElementById("loaderStatus");

    if (loader) {

        document.body.classList.add("loading");

        const duration = 2600;
        const startTime = performance.now();

        let loaderFinished = false;


        function updateLoader(currentTime) {

            if (loaderFinished) {
                return;
            }

            const elapsed = currentTime - startTime;

            let progress = Math.min(
                elapsed / duration,
                1
            );


            /* Smooth Progress */

            const easedProgress =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const percentage =
                Math.floor(
                    easedProgress * 100
                );


            if (loaderFill) {
                loaderFill.style.width =
                    percentage + "%";
            }


            if (loaderPercent) {
                loaderPercent.textContent =
                    percentage + "%";
            }


            /* Status Messages */

            if (loaderStatus) {

                if (percentage < 20) {

                    loaderStatus.textContent =
                        "INITIALIZING CORE";

                }

                else if (percentage < 45) {

                    loaderStatus.textContent =
                        "CONNECTING NETWORK";

                }

                else if (percentage < 70) {

                    loaderStatus.textContent =
                        "LOADING INTERFACE";

                }

                else if (percentage < 92) {

                    loaderStatus.textContent =
                        "SYNCHRONIZING CONTENT";

                }

                else {

                    loaderStatus.textContent =
                        "SYSTEM READY";

                }

            }


            if (progress < 1) {

                requestAnimationFrame(
                    updateLoader
                );

            }

            else {

                finishLoader();

            }

        }


        function finishLoader() {

            if (loaderFinished) {
                return;
            }

            loaderFinished = true;


            if (loaderFill) {
                loaderFill.style.width =
                    "100%";
            }


            if (loaderPercent) {
                loaderPercent.textContent =
                    "100%";
            }


            if (loaderStatus) {
                loaderStatus.textContent =
                    "SYSTEM READY";
            }


            setTimeout(() => {

                loader.classList.add(
                    "loader-hidden"
                );

                document.body.classList.remove(
                    "loading"
                );

            }, 250);


            setTimeout(() => {

                if (loader.parentNode) {
                    loader.remove();
                }

            }, 1100);

        }


        requestAnimationFrame(
            updateLoader
        );


        /* Emergency Failsafe */

        setTimeout(() => {

            finishLoader();

        }, 4200);

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const hamburger =
        document.getElementById(
            "hamburger"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    function closeMenu() {

        if (!hamburger || !navLinks) {
            return;
        }

        hamburger.classList.remove(
            "active"
        );

        navLinks.classList.remove(
            "mobile-open"
        );

        document.body.classList.remove(
            "menu-open"
        );

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (hamburger && navLinks) {

        hamburger.addEventListener(
            "click",
            () => {

                hamburger.classList.toggle(
                    "active"
                );

                navLinks.classList.toggle(
                    "mobile-open"
                );

                document.body.classList.toggle(
                    "menu-open"
                );


                const open =
                    navLinks.classList.contains(
                        "mobile-open"
                    );


                hamburger.setAttribute(
                    "aria-expanded",
                    open
                );

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 980) {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.getElementById(
            "navbar"
        );


    function updateNavbar() {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 35) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        }

        else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }

    }


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 550) {

                backToTop.classList.add(
                    "visible"
                );

            }

            else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }


        updateBackToTop();


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       AUTOMATIC YEAR
    ===================================================== */

    document
        .querySelectorAll(
            "[data-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date()
                    .getFullYear();

        });


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.getElementById(
            "cursorGlow"
        );


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        cursorGlow &&
        finePointer
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    event.clientX + "px";

                cursorGlow.style.top =
                    event.clientY + "px";

                cursorGlow.style.opacity =
                    "1";

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                cursorGlow.style.opacity =
                    "0";

            }
        );

    }


    /* =====================================================
       CARD MOUSE SPOTLIGHT
    ===================================================== */

    document
        .querySelectorAll(
            ".card"
        )
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        x + "px"
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        y + "px"
                    );

                }
            );

        });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const href =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (formMessage) {

                    formMessage.textContent =
                        "Das Kontaktformular ist aktuell eine Demo. Für echten Versand muss noch ein Formular-Dienst verbunden werden.";

                }


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(link => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        });


});

/* =====================================================
   ICEMAX COUNTDOWN
===================================================== */

const countdownDays =
    document.getElementById("countdownDays");

const countdownHours =
    document.getElementById("countdownHours");

const countdownMinutes =
    document.getElementById("countdownMinutes");

const countdownSeconds =
    document.getElementById("countdownSeconds");

const countdownStatus =
    document.getElementById("countdownStatus");


/*
    Ziel:
    Samstag, 07. November 2026
    20:00 Uhr Schweiz

    November = Monat 10,
    weil JavaScript bei 0 beginnt:
    Januar = 0
    November = 10
*/

const countdownTarget =
    new Date(
        2026,
        10,
        7,
        20,
        0,
        0
    );


function updateCountdown() {

    if (
        !countdownDays ||
        !countdownHours ||
        !countdownMinutes ||
        !countdownSeconds
    ) {
        return;
    }


    const now =
        new Date();


    const distance =
        countdownTarget.getTime()
        -
        now.getTime();


    /*
        COUNTDOWN BEENDET
    */

    if (distance <= 0) {

        countdownDays.textContent =
            "00";

        countdownHours.textContent =
            "00";

        countdownMinutes.textContent =
            "00";

        countdownSeconds.textContent =
            "00";


        if (countdownStatus) {

            countdownStatus.textContent =
                "THE WAIT IS OVER";

        }


        return;
    }


    /*
        ZEIT BERECHNEN
    */

    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            )
            /
            (
                1000 *
                60 *
                60
            )
        );


    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            )
            /
            (
                1000 *
                60
            )
        );


    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            )
            /
            1000
        );


    /*
        AUSGABE
    */

    countdownDays.textContent =
        String(days).padStart(
            2,
            "0"
        );


    countdownHours.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    countdownMinutes.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    countdownSeconds.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


/*
    SOFORT STARTEN
*/

updateCountdown();


/*
    JEDE SEKUNDE AKTUALISIEREN
*/

setInterval(
    updateCountdown,
    1000
);
