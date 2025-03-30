function redirectToContent() {
  // Add fade-out animation to the body
  document.body.classList.add('fade-out');

  // Wait for the animation to complete before redirecting
  setTimeout(() => {
    sessionStorage.setItem("music-playing", "true"); // Save music state
    window.location.href = "Wedding Gallery.html"; // Redirect
  }, 500); // Match this duration with the fade-out animation (0.5s = 500ms)
}

// Force reload the page when navigating back
window.onpageshow = function(event) {
if (event.persisted) { // Check if the page is loaded from the cache
  window.location.reload(); // Reload the page
}
}

// Set the target date and time in Jakarta time (UTC+7)
const targetDate = new Date("2025-06-19T10:00:00+07:00"); // January 1, 2024, 00:00:00 Jakarta time
// Convert the target date to a UTC timestamp
const targetTime = targetDate.getTime();

// Helper function to add leading zeros
function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}

// Update the countdown every 1 second
const countdownFunction = setInterval(() => {
  // Get the current time in UTC
  const now = new Date().getTime();

  // Calculate the distance between now and the target time
  const distance = targetTime - now;

  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Format hours, minutes, and seconds with leading zeros
  const formattedHours = formatNumber(hours);
  const formattedMinutes = formatNumber(minutes);
  const formattedSeconds = formatNumber(seconds);

  // Output the result in the respective elements
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = formattedHours;
  document.getElementById("minutes").innerHTML = formattedMinutes;
  document.getElementById("seconds").innerHTML = formattedSeconds;

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
  const album = document.querySelector('.album');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageIndicator = document.getElementById('pageIndicator');
  
  let currentPage = 0;
  let totalPages = 10; // 10 content pages + cover
  let isAnimating = false;
  let autoCloseTimer = null;
  
  // Create pages dynamically
  function createPages() {
      for (let i = 1; i <= totalPages; i++) {
          const page = document.createElement('div');
          page.className = `album-page page-${i} hidden`;
          page.innerHTML = `<img src="photo${i}.jpg" alt="Wedding Photo ${i}">`;
          album.appendChild(page);
      }
  }
  
  createPages();
  
  // Initialize
  function init() {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'block';
      updatePageIndicator();
  }
  
  // Update page indicator text
  function updatePageIndicator() {
      if (currentPage === 0) {
          pageIndicator.textContent = 'Click to view our wedding album';
      } else if (currentPage === totalPages) {
          pageIndicator.textContent = 'The End';
      } else {
          pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
      }
  }
  
  // Flip to next page
  function nextPage() {
      if (isAnimating || currentPage >= totalPages) return;
      
      isAnimating = true;
      currentPage++;
      
      // Show the next page
      const currentPageElement = document.querySelector(`.page-${currentPage}`);
      currentPageElement.classList.remove('hidden');
      
      // Apply flipping animation
      currentPageElement.style.transform = 'rotateY(-180deg)';
      setTimeout(() => {
          currentPageElement.style.transform = 'rotateY(0deg)';
          isAnimating = false;
          
          // Hide previous page if not cover
          if (currentPage > 1) {
              document.querySelector(`.page-${currentPage-1}`).classList.add('hidden');
          } else if (currentPage === 1) {
              document.querySelector('.page-cover').classList.add('hidden');
          }
          
          updatePageIndicator();
          
          // Auto-close if last page
          if (currentPage === totalPages) {
              autoCloseTimer = setTimeout(() => {
                  resetToCover();
              }, 3000);
          }
      }, 10);
      
      // Update button visibility
      prevBtn.style.display = 'block';
      if (currentPage === totalPages) {
          nextBtn.style.display = 'none';
      }
  }
  
  // Flip to previous page
  function prevPage() {
      if (isAnimating || currentPage <= 0) return;
      
      // Clear auto-close timer if active
      if (autoCloseTimer) {
          clearTimeout(autoCloseTimer);
          autoCloseTimer = null;
      }
      
      isAnimating = true;
      
      // Show the page we're returning to
      if (currentPage === totalPages) {
          document.querySelector(`.page-${currentPage}`).classList.add('hidden');
          document.querySelector(`.page-${currentPage-1}`).classList.remove('hidden');
      } else if (currentPage === 1) {
          document.querySelector('.page-cover').classList.remove('hidden');
          document.querySelector(`.page-${currentPage}`).classList.add('hidden');
      } else {
          document.querySelector(`.page-${currentPage-1}`).classList.remove('hidden');
          document.querySelector(`.page-${currentPage}`).classList.add('hidden');
      }
      
      currentPage--;
      
      // Apply reverse flipping animation
      const returningPage = currentPage === 0 ? document.querySelector('.page-cover') : document.querySelector(`.page-${currentPage}`);
      returningPage.style.transform = 'rotateY(180deg)';
      setTimeout(() => {
          returningPage.style.transform = 'rotateY(0deg)';
          isAnimating = false;
          updatePageIndicator();
      }, 10);
      
      // Update button visibility
      nextBtn.style.display = 'block';
      if (currentPage === 0) {
          prevBtn.style.display = 'none';
      }
  }
  
  // Reset to cover
  function resetToCover() {
      if (currentPage === 0) return;
      
      // Hide current page
      if (currentPage === totalPages) {
          document.querySelector(`.page-${currentPage}`).classList.add('hidden');
      } else {
          document.querySelector(`.page-${currentPage}`).classList.add('hidden');
      }
      
      // Show cover
      document.querySelector('.page-cover').classList.remove('hidden');
      currentPage = 0;
      
      // Update UI
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'block';
      updatePageIndicator();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextPage);
  prevBtn.addEventListener('click', prevPage);
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
          nextPage();
      } else if (e.key === 'ArrowLeft') {
          prevPage();
      }
  });
  
  // Initialize
  init();
});