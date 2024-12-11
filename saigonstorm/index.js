const matchSchedule = [
    { date: '14 Dec 2024 19:00 GMT+7', title: 'Premier Match', map: 'Haven' },
    { date: '15 Dec 2024 19:00 GMT+7', title: 'Premier Playoffs', map: 'To Be Determined' },
    { date: '21 Dec 2024 19:00 GMT+7', title: 'Premier Playoffs', map: 'To Be Determined' }
];

// Function to calculate the time remaining
function getTimeRemaining(matchDate) {
    const now = new Date(); // Current local time
    const matchTime = new Date(matchDate); // Parse match date correctly
    const timeDiff = matchTime - now; // Time difference in milliseconds

    if (timeDiff <= 0) {
        return null; // Match already happening or passed
    }

    // Convert milliseconds to days, hours, minutes, seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    // Pad with leading zeroes for consistent formatting
    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}

// Display countdown for the next match
function updateCountdown() {
    const nextMatch = matchSchedule.find(match => new Date(match.date) > new Date());
    if (!nextMatch) {
        document.getElementById('countdown-timer').innerText = 'No upcoming matches.';
        return;
    }

    const timeRemaining = getTimeRemaining(nextMatch.date);
    if (!timeRemaining) {
        document.getElementById('countdown-timer').innerText = 'Live now!';
        return;
    }

    const { days, hours, minutes, seconds } = timeRemaining;
    document.getElementById('countdown-timer').innerHTML = `
        <p>Next Match: ${nextMatch.title} on ${nextMatch.map}</p>
        <p>${days}:${hours}:${minutes}:${seconds}</p>
    `;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
