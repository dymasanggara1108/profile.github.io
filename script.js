// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll ke atas saat refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});

// Loader
window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
});

const toggle = document.getElementById("toggleMode");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
});

// Scroll Reveal (Hero tidak termasuk)
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

reveals.forEach(section => {
    observer.observe(section);
});

// Skill Animation
window.addEventListener("scroll", () => {
    document.querySelectorAll(".progress").forEach(bar => {
        let rect = bar.getBoundingClientRect();
        if(rect.top < window.innerHeight){
            bar.style.width = bar.dataset.width;
        }
    });
});

// Animated Counter
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 200;

        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                updateCount();
                observer.unobserve(counter);
            }
        });
    });

    observer.observe(counter);
});