
(function () {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("nav-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("nav-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }
})();
// About section scroll animation

const aboutElements = document.querySelectorAll(
  ".about-visual, .about-content"
);

const aboutObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

aboutElements.forEach((element) => {
  aboutObserver.observe(element);
});


document.querySelectorAll(".tstmnial_dfg_slider").forEach(function(slider) {
  const track = slider.querySelector(".tstmnial_dfg_track");
  const cards = Array.from(track.querySelectorAll(".tstmnial_dfg_card"));
  const prev = slider.querySelector(".tstmnial_dfg_prev");
  const next = slider.querySelector(".tstmnial_dfg_next");
  const dotsBox = slider.querySelector(".tstmnial_dfg_dots");

  let currentIndex = 0;

  cards.forEach(function(card, index) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "tstmnial_dfg_dot";
    dot.setAttribute("aria-label", "Go to review " + (index + 1));

    dot.addEventListener("click", function() {
      currentIndex = index;
      updateSlider();
    });

    dotsBox.appendChild(dot);
  });

  const dots = Array.from(
    dotsBox.querySelectorAll(".tstmnial_dfg_dot")
  );

  function getVisibleCards() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCards());
  }

  function updateSlider() {
    currentIndex = Math.min(currentIndex, getMaxIndex());

    const card = cards[currentIndex];

    track.scrollTo({
      left: card.offsetLeft - cards[0].offsetLeft,
      behavior: "smooth"
    });

    dots.forEach(function(dot, index) {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  prev.addEventListener("click", function() {
    currentIndex = currentIndex > 0
      ? currentIndex - 1
      : getMaxIndex();

    updateSlider();
  });

  next.addEventListener("click", function() {
    currentIndex = currentIndex < getMaxIndex()
      ? currentIndex + 1
      : 0;

    updateSlider();
  });

  track.addEventListener("scroll", function() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

    if (cardWidth + gap > 0) {
      const index = Math.round(
        track.scrollLeft / (cardWidth + gap)
      );

      currentIndex = Math.min(index, getMaxIndex());

      dots.forEach(function(dot, i) {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }, { passive: true });

  window.addEventListener("resize", updateSlider);

  updateSlider();
});


(function () {
  const form = document.getElementById("footer_frminfo_form");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = document.getElementById(
      "footer_frminfo_name"
    ).value.trim();

    const email = document.getElementById(
      "footer_frminfo_email"
    ).value.trim();

    const service = document.getElementById(
      "footer_frminfo_service"
    ).value;

    const message = document.getElementById(
      "footer_frminfo_message"
    ).value.trim();

    const status = document.getElementById(
      "footer_frminfo_status"
    );

    const subject = "Agriculture Project Enquiry - " + service;

    const body =
      "Hello Bhawana Agrotech Team,\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Interested in: " + service + "\n\n" +
      "Project Details:\n" +
      (message || "Not provided") +
      "\n\nThank you.";

    status.textContent =
      "Your email app will open with your enquiry details.";

    const mailto =
      "mailto:info@bhawanabiotech.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
  });
})();

document.querySelectorAll(".faq_frminfo_section").forEach(function(section) {
  const items = section.querySelectorAll(".faq_frminfo_item");

  items.forEach(function(item) {
    const button = item.querySelector(".faq_frminfo_question");
    const answer = item.querySelector(".faq_frminfo_answer");

    button.setAttribute(
      "aria-controls",
      "faq_frminfo_" + Array.from(items).indexOf(item)
    );

    answer.id = button.getAttribute("aria-controls");

    button.addEventListener("click", function() {
      const shouldOpen = !item.classList.contains("active");

      items.forEach(function(other) {
        other.classList.remove("active");
        other.querySelector(".faq_frminfo_question")
          .setAttribute("aria-expanded", "false");
      });

      if (shouldOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});