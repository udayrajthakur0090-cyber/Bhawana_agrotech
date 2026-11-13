
/* POLYHOUSE PAGE TABS */

document.addEventListener("DOMContentLoaded", function () {

    const phTabButtons = document.querySelectorAll(".ph_tab_btn");
    const phTabPanels = document.querySelectorAll(".ph_tab_panel");

    phTabButtons.forEach(function (button, index) {

        button.setAttribute("tabindex", index === 0 ? "0" : "-1");

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data_ph_tab");

            phTabButtons.forEach(function (tab) {
                tab.classList.remove("ph_tab_active");
                tab.setAttribute("aria-selected", "false");
                tab.setAttribute("tabindex", "-1");
            });

            phTabPanels.forEach(function (panel) {
                panel.classList.remove("ph_panel_active");
                panel.hidden = true;
            });

            button.classList.add("ph_tab_active");
            button.setAttribute("aria-selected", "true");
            button.setAttribute("tabindex", "0");

            const activePanel = document.getElementById(targetId);

            if (activePanel) {
                activePanel.hidden = false;
                activePanel.classList.add("ph_panel_active");
            }

            button.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
            });

        });

        button.addEventListener("keydown", function (event) {

            let nextIndex = index;

            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % phTabButtons.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + phTabButtons.length) % phTabButtons.length;
            } else {
                return;
            }

            event.preventDefault();
            phTabButtons[nextIndex].focus();
            phTabButtons[nextIndex].click();

        });

    });

});
