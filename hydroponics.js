
/* HYDROPONICS TABS */

document.addEventListener("DOMContentLoaded", function () {

    const hyTabButtons = document.querySelectorAll(".hy_tab_btn");
    const hyTabPanels = document.querySelectorAll(".hy_tab_panel");

    hyTabButtons.forEach(function (button, index) {

        button.setAttribute("tabindex", index === 0 ? "0" : "-1");

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data_hy_tab");

            hyTabButtons.forEach(function (tab) {
                tab.classList.remove("hy_tab_active");
                tab.setAttribute("aria-selected", "false");
                tab.setAttribute("tabindex", "-1");
            });

            hyTabPanels.forEach(function (panel) {
                panel.classList.remove("hy_panel_active");
                panel.hidden = true;
            });

            button.classList.add("hy_tab_active");
            button.setAttribute("aria-selected", "true");
            button.setAttribute("tabindex", "0");

            const activePanel = document.getElementById(targetId);

            if (activePanel) {
                activePanel.hidden = false;
                activePanel.classList.add("hy_panel_active");
            }

        });

        button.addEventListener("keydown", function (event) {

            let nextIndex = index;

            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % hyTabButtons.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + hyTabButtons.length) % hyTabButtons.length;
            } else {
                return;
            }

            event.preventDefault();
            hyTabButtons[nextIndex].focus();
            hyTabButtons[nextIndex].click();

        });

    });

});
