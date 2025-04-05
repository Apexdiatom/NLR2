document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const timelineScroll = document.getElementById("timelineScroll");
    const eventDisplay = document.getElementById("eventDisplay");
    const yearInput = document.getElementById("yearInput");
  
    const startYear = 0;
    const endYear = 6025;
    const spacing = 10;
  
    const events = {
      0: "The dawn of recorded history (4000 BCE)",
      2024: "USAID builds AVIVA",
      4000: "Bronze Age begins",
      5050: "Printing press invented (~1450 CE)",
      6019: "COVID-19 pandemic"
    };
  
    function getLabel(realYear) {
      const conventional =
        realYear === 0
          ? "4000 BCE"
          : realYear < 4000
          ? `${4000 - realYear} BCE`
          : `${realYear - 4000} CE`;
      return `${conventional} (${realYear})`;
    }
  
    // Create left spacer
    const spacer = document.createElement("div");
    spacer.style.display = "inline-block";
    spacer.style.width = "50vw";
    timeline.appendChild(spacer);
  
    // Generate ticks
    for (let y = startYear; y <= endYear; y++) {
      const tick = document.createElement("div");
      tick.classList.add("tick");
  
      if (y === startYear || y === endYear || y % 100 === 0) {
        tick.classList.add("century");
        tick.setAttribute("data-label", getLabel(y));
      }
  
      timeline.appendChild(tick);
    }
  
    // Right spacer
    const endSpacer = document.createElement("div");
    endSpacer.style.display = "inline-block";
    endSpacer.style.width = "50vw";
    timeline.appendChild(endSpacer);
  
    // Set timeline width dynamically
    const totalYears = endYear - startYear + 1;
    timeline.style.width = `${totalYears * spacing + window.innerWidth}px`;
  
    // Scroll to year 2024 (6024 real year)
    const initialOffset = 6024 * spacing;
    timelineScroll.scrollLeft = initialOffset;
  
    function updateEventDisplay(year) {
      const label = getLabel(year);
      if (events[year]) {
        eventDisplay.innerHTML = `<h2>📌 ${label}</h2><p>${events[year]}</p>`;
      } else {
        eventDisplay.innerHTML = `<h2>📍 ${label}</h2><p>No recorded event.</p>`;
      }
    }
  
    let previousActive = null;
  
    function updateActiveTick(year) {
      const allTicks = timeline.querySelectorAll(".tick");
      if (previousActive) {
        previousActive.classList.remove("active");
      }
      const tick = allTicks[year + 1]; // +1 for left spacer
      if (tick) {
        tick.classList.add("active");
        previousActive = tick;
      }
    }
  
    timelineScroll.addEventListener("scroll", () => {
      const year = Math.round(timelineScroll.scrollLeft / spacing);
      const clamped = Math.max(startYear, Math.min(endYear, year));
      updateEventDisplay(clamped);
      updateActiveTick(clamped);
    });
  
    yearInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = yearInput.value.trim().toUpperCase();
        
        let realYear = null;

        if (val.endsWith("BCE")) {
        const n = parseInt(val);
        if (!isNaN(n) && n >= 1 && n <= 4000) {
            realYear = 4000 - n;
        }
        } else if (val.endsWith("CE")) {
        const n = parseInt(val);
        if (!isNaN(n)) {
            realYear = 4000 + n;
        }
        } else {
        // Treat plain number as real year
        const n = parseInt(val);
        if (!isNaN(n)) {
            realYear = n;
        }
        }
        
        if (realYear !== null && realYear >= startYear && realYear <= endYear) {
          timelineScroll.scrollLeft = realYear * spacing;
          updateEventDisplay(realYear);
          updateActiveTick(realYear);
        } else {
          alert("Invalid year. Try formats like '300 BCE' or '1450 CE'.");
        }
      }
    });
  
    updateEventDisplay(6024);
    updateActiveTick(6024);
  });
  