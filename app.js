let user = document.getElementById("uses");
let button = document.getElementById("bttn");
let profileContainer = document.getElementById("two");

async function fetchUser(username) {
    profileContainer.innerHTML = `<div class="loading">Loading Profile...</div>`;

    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        let result = await response.json();
        displayUser(result);
    } catch (error) {
        profileContainer.innerHTML = `<h2>User Not Found 😢</h2>`;
    }
}

button.addEventListener("click", () => {
    let userID = user.value.trim();
    if (userID) {
        fetchUser(userID);
    }
});

user.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let userID = user.value.trim();
        if (userID) {
            fetchUser(userID);
        }
    }
});

function displayUser(result) {
    if (!result.html_url) {
        profileContainer.innerHTML = `<h1>User Not Found 😢</h1>`;
        return;
    }

    profileContainer.innerHTML = `
    <div class="profile-card">
        <div class="userInfo">
            <img class="img" src="${result.avatar_url}" alt="User Avatar">
            <div class="userDetail">
                <p class="userName">${result.name || "No Name Available"}</p>
                <p class="userbio">${result.bio || "No bio available"}</p>
                <div class="extra">
                    <p>📍 ${result.location || "Not Available"}</p>
                    <p>🏢 ${result.company || "Not Available"}</p>
                    <p>📅 Joined: ${new Date(result.created_at).toDateString()}</p>
                </div>
            </div>
        </div>

        <div class="stats-container">
            <div class="stats">
                <p><strong>Followers</strong><br>${result.followers}</p>
                <p><strong>Following</strong><br>${result.following}</p>
                <p><strong>Repos</strong><br>${result.public_repos}</p>
            </div>

            <a href="${result.html_url}" target="_blank" class="viewProfile">
                View Profile →
            </a>
        </div>
    </div>`;
}
