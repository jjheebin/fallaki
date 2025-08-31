// 메뉴 토글 버튼을 눌렀을 때, 메뉴를 열고 닫아요.
document.addEventListener("DOMContentLoaded", function () {
  // 오프닝: 새로고침 시 한 번만 보여줘요.
  var opening = document.getElementById("opening");
  try {
    var hasShown = sessionStorage.getItem("aki_opening_shown") === "1";
    if (opening && !hasShown) {
      opening.hidden = false;
      opening.classList.add("is-visible");
      setTimeout(function () {
        // 페이드 아웃을 주면서 닫아요
        opening.classList.remove("is-visible");
        setTimeout(function () {
          opening.hidden = true;
          sessionStorage.setItem("aki_opening_shown", "1");
        }, 300); // opacity 전환 시간과 맞춰요
      }, 1800); // 총 1.8초 노출 (로딩바 1.2초 포함)
    }
  } catch (e) {
    // sessionStorage가 막혀 있어도 메인은 보여야 해요.
    if (opening) {
      opening.hidden = true;
    }
  }

  var toggleButton = document.querySelector(".nav-toggle");
  var menu = document.getElementById("primary-menu");

  if (!toggleButton || !menu) return;

  toggleButton.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  });
});

// 캐러셀: 자동으로 넘기고, 버튼으로도 조작해요.
document.addEventListener("DOMContentLoaded", function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero__slide"));
  var prevBtn = document.querySelector(".hero__arrow--prev");
  var nextBtn = document.querySelector(".hero__arrow--next");
  var currentIndex = 0;
  var autoplayMs = 4000; // 4초마다 다음 장으로 넘어가요.
  var timerId = null;

  if (!slides.length || !prevBtn || !nextBtn) return;

  function updateSlides(nextIndex) {
    slides.forEach(function (slide, i) {
      var isActive = i === nextIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      // 시각적으로는 CSS로 제어하고, 여기서는 접근성 속성만 관리해요.
    });
    currentIndex = nextIndex;
  }

  function goNext() {
    var nextIndex = (currentIndex + 1) % slides.length; // 마지막 다음에는 처음으로 돌아와요.
    updateSlides(nextIndex);
  }

  function goPrev() {
    var nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides(nextIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    timerId = setInterval(goNext, autoplayMs);
  }

  function stopAutoplay() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  // 버튼으로 슬라이드를 넘길 수 있어요.
  prevBtn.addEventListener("click", function () {
    goPrev();
    startAutoplay(); // 조작 후에도 자동재생이 이어지도록 다시 시작해요.
  });
  nextBtn.addEventListener("click", function () {
    goNext();
    startAutoplay();
  });

  // 사용자가 마우스를 올리면 자동재생을 잠시 멈춰요.
  var viewport = document.querySelector(".hero__viewport");
  if (viewport) {
    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);
  }

  // 키보드로도 조작할 수 있게 해요.
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      goPrev();
      startAutoplay();
    } else if (e.key === "ArrowRight") {
      goNext();
      startAutoplay();
    }
  });

  // 처음 시작할 때 보이는 상태로 세팅하고 자동재생을 켜요.
  updateSlides(0);
  startAutoplay();
});

// 오마카세: [더보기]/[닫기] 버튼으로 자세한 구성을 보여줘요.
document.addEventListener("DOMContentLoaded", function () {
  var toggles = Array.prototype.slice.call(document.querySelectorAll(".card__toggle"));
  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var regionId = btn.getAttribute("aria-controls");
      var region = regionId ? document.getElementById(regionId) : null;
      if (!region) return;

      var expanded = btn.getAttribute("aria-expanded") === "true";
      var nextExpanded = !expanded;
      btn.setAttribute("aria-expanded", String(nextExpanded));
      btn.textContent = nextExpanded ? "[닫기 ▲]" : "[더보기 ▼]";
      region.hidden = !nextExpanded;
    });
  });
});

// 인사말: 텍스트를 4줄만 보여주고, [더보기]/[닫기]로 전체 열고 닫아요.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("greeting-toggle");
  var text = document.getElementById("greeting-text");
  if (!toggle || !text) return;

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    var nextExpanded = !expanded;
    toggle.setAttribute("aria-expanded", String(nextExpanded));
    text.setAttribute("aria-expanded", String(nextExpanded));
    text.classList.toggle("is-open", nextExpanded);
    toggle.textContent = nextExpanded ? "[닫기 ▲]" : "[더보기 ▼]";
  });
});


