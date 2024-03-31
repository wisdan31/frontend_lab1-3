document.addEventListener('DOMContentLoaded', function () {
    var surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];
    var chessPlayers = surveyResults.filter(function (result) {
        return parseInt(result.hours) > 4;
    });
    var playerList = document.getElementById('playerList');
    chessPlayers.forEach(function (player) {
        var listItem = document.createElement('li');
        listItem.textContent = player.name + " (" + player.hours + " hours/week)";
        playerList.appendChild(listItem);
    });
    if (chessPlayers.length === 0) {
        var message = document.createElement('p');
        message.textContent = "No respondents spend more than 4 hours per week playing chess.";
        playerList.appendChild(message);
    }
    var highestSkill = surveyResults.reduce(function (prev, current) {
        return (prev.skill > current.skill) ? prev : current;
    });
    var highestSkillPlayers = document.getElementById('highestSkillPlayers');
    var highestSkillListItem = document.createElement('li');
    highestSkillListItem.textContent = highestSkill.name;
    highestSkillPlayers.appendChild(highestSkillListItem);
    var under18Players = surveyResults.filter(function (result) {
        var birthday = new Date(result.birthday);
        var today = new Date();
        var age = today.getFullYear() - birthday.getFullYear();
        var monthDiff = today.getMonth() - birthday.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age < 18;
    });
    var under18PlayersList = document.getElementById('under18Players');
    under18Players.forEach(function (player) {
        var listItem = document.createElement('li');
        listItem.textContent = player.name + " (Age: " + calculateAge(player.birthday) + ")";
        under18PlayersList.appendChild(listItem);
    });
    if (under18Players.length === 0) {
        var message = document.createElement('p');
        message.textContent = "No respondents are under 18 years old.";
        under18PlayersList.appendChild(message);
    }
    function calculateAge(birthday) {
        var birthDate = new Date(birthday);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        var monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
});
