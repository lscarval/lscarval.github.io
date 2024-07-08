document.addEventListener('DOMContentLoaded', function() {
    const username = 'lscarval';
    const activityList = document.getElementById('activity-list');
    const repoList = document.getElementById('repo-list');

    // Fetch GitHub activities
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

    // Fetch GitHub repositories
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.target = '_blank';
                link.textContent = repo.name;
                listItem.appendChild(link);
                repoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching GitHub repositories:', error));

    function formatEvent(event) {
        const { type, repo, created_at } = event;
        return `${type} at ${repo.name} on ${new Date(created_at).toLocaleString()}`;
    }
});
