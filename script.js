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


        let currentPage = 0;
        const totalPages = 10; // Cover + 10 pages
        
        function startAlbum() {
            document.getElementById('cover').classList.add('flipping');
            document.getElementById('navButtons').classList.remove('hidden');
            
            setTimeout(() => {
                document.getElementById('cover').classList.add('hidden');
                document.getElementById('cover').classList.remove('flipping');
                document.getElementById('cover').classList.add('flipped');
                document.getElementById('page1').classList.remove('hidden');
                currentPage = 1;
            }, 1000);
        }
        
        function nextPage() {
            if (currentPage >= totalPages) return;
            
            const currentPageElement = document.getElementById(`page${currentPage}`);
            currentPageElement.classList.add('flipping');
            
            setTimeout(() => {
                currentPageElement.classList.add('hidden');
                currentPageElement.classList.remove('flipping');
                currentPageElement.classList.add('flipped');
                
                currentPage++;
                if (currentPage <= totalPages) {
                    document.getElementById(`page${currentPage}`).classList.remove('hidden');
                }
                
                // Hide next button on last page
                if (currentPage === totalPages) {
                    document.querySelector('#navButtons button:last-child').classList.add('opacity-50', 'cursor-not-allowed');
                }
                
                // Show previous button if it was hidden
                document.querySelector('#navButtons button:first-child').classList.remove('opacity-50', 'cursor-not-allowed');
            }, 1000);
        }
        
        function prevPage() {
            if (currentPage <= 1) return;
            
            // If we're going back to the cover
            if (currentPage === 1) {
                document.getElementById('cover').classList.remove('hidden', 'flipped');
                document.getElementById('page1').classList.add('hidden');
                document.getElementById('navButtons').classList.add('hidden');
                currentPage = 0;
                return;
            }
            
            const currentPageElement = document.getElementById(`page${currentPage}`);
            currentPageElement.classList.add('hidden');
            
            currentPage--;
            const prevPageElement = document.getElementById(`page${currentPage}`);
            prevPageElement.classList.remove('hidden', 'flipped');
            prevPageElement.classList.add('flipping-back');
            
            setTimeout(() => {
                prevPageElement.classList.remove('flipping-back');
                
                // Hide previous button on first page
                if (currentPage === 1) {
                    document.querySelector('#navButtons button:first-child').classList.add('opacity-50', 'cursor-not-allowed');
                }
                
                // Show next button if it was hidden
                document.querySelector('#navButtons button:last-child').classList.remove('opacity-50', 'cursor-not-allowed');
            }, 1000);
        }