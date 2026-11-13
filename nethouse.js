// Net House page FAQ accordion. Existing script.js remains unchanged.
document.addEventListener("DOMContentLoaded", function () {
  const nhFaqItems = document.querySelectorAll(".nh_faq_item");

  nhFaqItems.forEach(function (item) {
    const button = item.querySelector(".nh_faq_question");
    if (!button) return;

    button.addEventListener("click", function () {
      const isOpen = item.classList.contains("nh_faq_active");

      nhFaqItems.forEach(function (otherItem) {
        otherItem.classList.remove("nh_faq_active");
        const otherButton = otherItem.querySelector(".nh_faq_question");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("nh_faq_active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});


/* Net House Tabs Functionality */

document.addEventListener("DOMContentLoaded", function () {

    const nhTabButtons = document.querySelectorAll(".nh_tab_button");
    const nhTabPanels = document.querySelectorAll(".nh_tab_panel");
    const nhTabNavigation = document.querySelector(".nh_tabs_navigation");
    const nhTabNext = document.querySelector(".nh_tab_next");

    nhTabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data_tab");

            nhTabButtons.forEach(function (tab) {
                tab.classList.remove("nh_tab_active");
                tab.setAttribute("aria-selected", "false");
                tab.setAttribute("tabindex", "-1");
            });

            nhTabPanels.forEach(function (panel) {
                panel.classList.remove("nh_panel_active");
                panel.hidden = true;
            });

            button.classList.add("nh_tab_active");
            button.setAttribute("aria-selected", "true");
            button.setAttribute("tabindex", "0");

            const activePanel = document.getElementById(targetId);

            if (activePanel) {
                activePanel.hidden = false;
                activePanel.classList.add("nh_panel_active");
            }

        });

    });

    if (nhTabNext && nhTabNavigation) {
        nhTabNext.addEventListener("click", function () {
            nhTabNavigation.scrollBy({
                left: 300,
                behavior: "smooth"
            });
        });
    }

});

