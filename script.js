// Force reload the page when navigating back
window.onpageshow = function(event) {
if (event.persisted) { // Check if the page is loaded from the cache
  window.location.reload(); // Reload the page
}
}

// Set the target date and time in Jakarta time (UTC+7)
const targetDate = new Date("2025-06-19T09:00:00+07:00"); // January 1, 2024, 00:00:00 Jakarta time
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
