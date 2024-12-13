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

// JavaScript for switching tabs
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and tab content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to the clicked button and corresponding tab content
        button.classList.add('active');
        const tabContent = document.getElementById(button.dataset.tab);
        tabContent.classList.add('active');
    });
});

// Set default active tab on page load
document.querySelector('.tab-button.active').click();


// Initially, set the default visible tab (matches) to show
document.getElementById("matches").classList.add("active");
document.getElementById("highlights").classList.remove("active");


//match archive script
document.addEventListener("DOMContentLoaded", () => {
    const matchFilter = document.getElementById("match-filter");
    const matches = document.querySelectorAll(".match");
    const matchesList = document.getElementById("matches-list");

    const noMatchesMessage = document.createElement("p");
    noMatchesMessage.id = "no-matches-message";
    noMatchesMessage.style.display = "none";
    noMatchesMessage.textContent = "No matches found for this filter.";
    matchesList.appendChild(noMatchesMessage);

    matchFilter.addEventListener("change", () => {
        const selectedResult = matchFilter.value;
        let visibleMatches = 0;

        matches.forEach(match => {
            if (selectedResult === "all" || match.dataset.result === selectedResult) {
                match.style.display = "block";
                visibleMatches++;
            } else {
                match.style.display = "none";
            }
        });

        if (visibleMatches === 0) {
            noMatchesMessage.style.display = "block";
        } else {
            noMatchesMessage.style.display = "none";
        }
    });
});



//highlight archive script
document.addEventListener("DOMContentLoaded", () => {
    const filter = document.getElementById("player-filter");
    const highlights = document.querySelectorAll(".highlight");
    const highlightsList = document.getElementById("highlights-list");

    const noClipsMessage = document.createElement("p");
    noClipsMessage.id = "no-clips-message";
    noClipsMessage.style.display = "none";
    noClipsMessage.textContent = ""; // This will be updated dynamically.
    highlightsList.appendChild(noClipsMessage);

    filter.addEventListener("change", () => {
        const selectedPlayer = filter.value;
        let visibleHighlights = 0;

        highlights.forEach(highlight => {
            if (selectedPlayer === "all" || highlight.dataset.player === selectedPlayer) {
                highlight.style.display = "block";
                visibleHighlights++;
            } else {
                highlight.style.display = "none";
            }
        });

        if (visibleHighlights === 0) {
            noClipsMessage.textContent = `No clips have been uploaded for ${selectedPlayer === "all" ? "any player" : selectedPlayer} yet. Check back again soon!`;
            noClipsMessage.style.display = "block";
        } else {
            noClipsMessage.style.display = "none";
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const confirmation = document.getElementById('confirmation');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = document.getElementById('message').value;
            const webhookUrl = "https://discord.com/api/webhooks/1317187802131071116/MgNnYDFLz7YpXp1iTfMLQgMtkBf_B79skRpvekl1IwH_-NIUD5DcnluGxnM0UmUGtXBL";

            if (message.trim() === "") {
                alert("Please enter a message.");
                return;
            }

            fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: "Website Contact Form",
                    content: message,
                    avatar_url: "https://saigonstorm.github.io/images/logo-no-text.png"
                })
            })
            .then(response => {
                if (response.ok) {
                    confirmation.style.display = "block";
                    contactForm.reset();
                    
                    setTimeout(() => {
                        confirmation.style.display = "none";
                    }, 3000);
                } else {
                    alert("There was an issue sending your message. Please try again later.");
                }
            })
            .catch(error => {
                console.error("Error sending message to Discord:", error);
                alert("An error occurred. Please check your connection and try again.");
            });
        });
    }
});
