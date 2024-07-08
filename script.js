document.addEventListener('DOMContentLoaded', function() {
    const username = 'lscarval';
    const activityList = document.getElementById('activity-list');

    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(response => response.json())
        .then(data => {
            data.slice(0, 10).forEach(event => {
                const listItem = document.createElement('li');
                listItem.textContent = formatEvent(event);
                activityList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching GitHub activities:', error));

    function formatEvent(event) {
        const { type, repo, created_at } = event;
        return `${type} at ${repo.name} on ${new Date(created_at).toLocaleString()}`;
    }
});
