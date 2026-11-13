(function () {

    const gallery = document.getElementById('bio_ft_gallery');
    const lightbox = document.getElementById('bio_ft_lightbox');
    const largeImg = document.getElementById('bio_ft_large_img');
    const closeBtn = document.getElementById('bio_ft_close');
    const prevBtn = document.getElementById('bio_ft_prev');
    const nextBtn = document.getElementById('bio_ft_next');
    const counter = document.getElementById('bio_ft_counter');

    const images = Array.from(
        gallery.querySelectorAll('.bio_ft_item img')
    );

    let currentIndex = 0;

    // Open Image
    function bio_ft_open(index) {
        currentIndex = index;
        bio_ft_show();
        lightbox.classList.add('bio_ft_active');
        document.body.style.overflow = 'hidden';
    }

    // Show Image
    function bio_ft_show() {
        largeImg.src = images[currentIndex].src;
        largeImg.alt = images[currentIndex].alt;
        counter.textContent =
            (currentIndex + 1) + ' / ' + images.length;
    }

    // Next Image
    function bio_ft_next() {
        currentIndex = (currentIndex + 1) % images.length;
        bio_ft_show();
    }

    // Previous Image
    function bio_ft_prev() {
        currentIndex =
            (currentIndex - 1 + images.length) % images.length;
        bio_ft_show();
    }

    // Close Lightbox
    function bio_ft_close() {
        lightbox.classList.remove('bio_ft_active');
        document.body.style.overflow = '';
    }

    // Click on gallery image
    images.forEach(function (img, index) {
        img.parentElement.addEventListener('click', function () {
            bio_ft_open(index);
        });
    });

    // Navigation buttons
    nextBtn.addEventListener('click', bio_ft_next);
    prevBtn.addEventListener('click', bio_ft_prev);

    // Close button
    closeBtn.addEventListener('click', bio_ft_close);

    // Outside click
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            bio_ft_close();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', function (e) {

        if (!lightbox.classList.contains('bio_ft_active')) return;

        if (e.key === 'ArrowRight') {
            bio_ft_next();
        }

        if (e.key === 'ArrowLeft') {
            bio_ft_prev();
        }

        if (e.key === 'Escape') {
            bio_ft_close();
        }
    });

    // Touch Swipe Support
    let touchStartX = 0;

    lightbox.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', function (e) {
        let touchEndX = e.changedTouches[0].screenX;
        let difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 50) {
            if (difference < 0) {
                bio_ft_next();
            } else {
                bio_ft_prev();
            }
        }
    });

})();