document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function () {
        var surveyForm = document.getElementById('surveyForm');

        var name = document.getElementById('name').value;
        var hours = document.getElementById('hours').value;
        var skill = document.getElementById('skill').value;
        var source = document.querySelector('input[name="source"]:checked').value;
        var feedback = document.getElementById('feedback').value;
        var birthday = document.getElementById('birthday').value;
        var email = document.getElementById('email').value;
        var userFriendly = document.getElementById('user-friendly').value;

        var osArray = [];
        var osCheckboxes = document.querySelectorAll('input[name="os"]:checked');
        osCheckboxes.forEach(function(checkbox) {
            osArray.push(checkbox.value);
        });

        saveSurveyResult(name, hours, skill, source, feedback, birthday, email, userFriendly, osArray);
    });

    function saveSurveyResult(name, hours, skill, source, feedback, birthday, email, userFriendly, osArray) {
        var surveyResults = JSON.parse(localStorage.getItem('surveyResults')) || [];

        surveyResults.push({
            name: name,
            hours: hours,
            skill: skill,
            source: source,
            feedback: feedback,
            birthday: birthday,
            email: email,
            userFriendly: userFriendly,
            operatingSystems: osArray
        });
        localStorage.setItem('surveyResults', JSON.stringify(surveyResults));

        alert('Survey submitted successfully!');
    }
});
