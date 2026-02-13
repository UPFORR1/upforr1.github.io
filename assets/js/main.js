/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);
// ============================
// Games Slider (My Games #two)
// ============================

(function () {
  // Wait until DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    const imgEl = document.getElementById("gameImg");
    const titleEl = document.getElementById("gameTitle");
    const descEl = document.getElementById("gameDesc");
    const linkEl = document.getElementById("gameLink");
    const dotsWrap = document.getElementById("dots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const frame = document.querySelector(".slider-frame");

    // If the slider isn't on this page, bail safely.
    if (!imgEl || !titleEl || !descEl || !linkEl || !dotsWrap || !prevBtn || !nextBtn || !frame) return;

    const games = [
      {
        title: "Project 1 — NES Zelda-Inspired",
        desc: "A nostalgic top-down adventure inspired by the NES Zelda, featuring a unique teleport mechanic that reshapes puzzles and combat flow.",
        img: "images/Zelda.png",
        link: "https://nononoah8.itch.io/nes-zelda"
      },
      {
        title: "Project 2 — SmashOut",
        desc: "A physics-based medieval boxing game where players attack using R2/1 and block with R1/2. Built around weighty combat, reactive feedback, and chaotic fun.",
        img: "images/MainPicture.png",
        link: "https://upfor.itch.io/smashout"
      },
      {
        title: "Project 3 — Split Heist",
        desc: "You were assigned a job, your very last Heist. This will set you up for life. But something seems off. Solve complex puzzles using advanced scientific equipment from Atherium's lab facilities to escape.",
        img: "images/SplitHeist.png",
        link: "https://fsxt.itch.io/splitheist"
      }
    ];

    let idx = 0;

    function renderDots() {
      dotsWrap.innerHTML = "";
      games.forEach((_, i) => {
        const d = document.createElement("button");
        d.className = "dot" + (i === idx ? " active" : "");
        d.setAttribute("type", "button");
        d.setAttribute("aria-label", `Go to game ${i + 1}`);
        d.addEventListener("click", () => {
          idx = i;
          render(true);
        });
        dotsWrap.appendChild(d);
      });
    }

    function setActiveDot() {
      [...dotsWrap.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === idx);
      });
    }

    // Optional fade animation (no CSS dependency, very light)
    function render(withFade) {
      const g = games[idx];

      if (withFade) {
        frame.style.transition = "opacity 160ms ease";
        frame.style.opacity = "0";
        setTimeout(() => {
          imgEl.src = g.img;
          imgEl.alt = g.title;
          titleEl.textContent = g.title;
          descEl.textContent = g.desc;
          linkEl.href = g.link;

          setActiveDot();
          frame.style.opacity = "1";
        }, 170);
      } else {
        imgEl.src = g.img;
        imgEl.alt = g.title;
        titleEl.textContent = g.title;
        descEl.textContent = g.desc;
        linkEl.href = g.link;

        setActiveDot();
      }
    }

    prevBtn.addEventListener("click", () => {
      idx = (idx - 1 + games.length) % games.length;
      render(true);
    });

    nextBtn.addEventListener("click", () => {
      idx = (idx + 1) % games.length;
      render(true);
    });

    // Keyboard arrows
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    // Swipe support
    let touchStartX = 0;
    frame.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    frame.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) < 40) return;
      if (dx > 0) prevBtn.click();
      else nextBtn.click();
    }, { passive: true });

    // Init
    renderDots();
    render(false);
  });
})();
// ============================
// Personal Project Auto Slider
// ============================

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".personal-slide");
    if (slides.length === 0) return;

    let index = 0;
    let interval;

    function showSlide(i) {
      slides.forEach((s, idx) => {
        s.classList.toggle("active", idx === i);
      });
    }

    function startSlider() {
      interval = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
      }, 3000);
    }

    function stopSlider() {
      clearInterval(interval);
    }

    // Pause on hover (desktop)
    const slider = document.querySelector(".personal-slider");
    if (slider) {
      slider.addEventListener("mouseenter", stopSlider);
      slider.addEventListener("mouseleave", startSlider);
    }

    // Init
    showSlide(index);
    startSlider();
  });
})();

// ============================
// Tools Dock: label + wheel scroll
// ============================
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const dock = document.getElementById("dock");
   
    if (!dock) return;

    // Show label on hover
    dock.querySelectorAll(".dock-item").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (label) label.textContent = item.getAttribute("data-label") || "";
      });
      item.addEventListener("mouseleave", () => {
        if (label) label.textContent = "";
      });
    });

    // Mouse wheel scroll horizontally (no shift needed)
    dock.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        dock.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });
})();

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const dock = document.getElementById("dock");
    
    if (!dock) return;

    const items = Array.from(dock.querySelectorAll(".dock-item"));

    // strength settings (tweak these)
    const maxScale = 1.1;     // biggest scale for hovered icon
    const minScale = 1.0;      // baseline
    const influence = 300;     // px radius where neighbors react

    function setScales(mouseX) {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const dist = Math.abs(mouseX - centerX);

        // smooth falloff curve
        const t = Math.max(0, 1 - dist / influence);
        const scale = minScale + (maxScale - minScale) * (t * t);

        item.style.transform = `scale(${scale})`;
      });
    }

    function resetScales() {
      items.forEach((item) => (item.style.transform = "scale(1)"));
      if (label) label.textContent = "";
    }

    dock.addEventListener("mousemove", (e) => {
      setScales(e.clientX);

      // label of closest item
      if (label) {
        let best = null;
        let bestDist = Infinity;
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const dist = Math.abs(e.clientX - centerX);
          if (dist < bestDist) {
            bestDist = dist;
            best = item;
          }
        });
        label.textContent = best?.getAttribute("data-label") || "";
      }
    });

    dock.addEventListener("mouseleave", resetScales);

    // Wheel scroll -> horizontal
    dock.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          dock.scrollLeft += e.deltaY;
        }
      },
      { passive: false }
    );
  });
})();

(function () {
  const grid = document.getElementById('rendersGrid');
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const closeBg = document.getElementById('lbClose');
  const closeX = document.getElementById('lbX');
  const prev = document.getElementById('lbPrev');
  const next = document.getElementById('lbNext');

  if (!grid || !lb || !lbImg) {
    console.warn('[Lightbox] Missing grid/lightbox elements', { grid, lb, lbImg });
    return;
  }

  const tiles = Array.from(grid.querySelectorAll('.render-item'));
  const sources = tiles
    .map(t => t.dataset.full || t.querySelector('img')?.src)
    .filter(Boolean);

  let i = 0;

  function openAt(index) {
    i = (index + sources.length) % sources.length;
    lbImg.src = sources[i];
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  function go(delta) { openAt(i + delta); }

  // Make sure click works even if other layers are on top
  tiles.forEach((t, idx) => {
    t.style.cursor = 'pointer';
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openAt(idx);
    });
  });

  closeBg?.addEventListener('click', close);
  closeX?.addEventListener('click', close);
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
})();
