var languageIndex = 0;
var languages = [
    "NanbuCamera 地震配信放送 | ",
    "NanbuCamera Earthquake Monitor Broadcast | ",
    "NanbuCamera 지진 감시 방송 | ",
    "NanbuCamera 地震監控播報 | ",
    ];
var dayOfWeekLabels = [
    ['日', '月', '火', '水', '木', '金', '土'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ['일', '월', '화', '수', '목', '금', '토'], 
    ['日', '一', '二', '三', '四', '五', '六'],
];
var textContainer = document.getElementById('dayOfWeek');

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var month = now.getMonth() + 1; 
    var date = now.getDate(); 
    var dayOfWeek = dayOfWeekLabels[languageIndex][now.getDay()]; 

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var timeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clock').textContent = timeString;

    var timezone = (languageIndex === 1 || languageIndex === 2 || languageIndex === 3) ? ' (JST)' : '';

    if (languageIndex === 1) {
        textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + dayOfWeek + ')' + timezone;
    } else {
        textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + dayOfWeek + ')' + timezone;
    }

    if (now.getSeconds() % 10 === 0) {
        textContainer.classList.remove('fade-in');
        textContainer.classList.add('fade-out');

        textContainer.addEventListener('animationend', function() {
            languageIndex = (languageIndex + 1) % languages.length;
            var newDayOfWeek = dayOfWeekLabels[languageIndex][now.getDay()]; 
            var newHours = now.getHours(); 
            var newMinutes = now.getMinutes(); 
            var newSeconds = now.getSeconds(); 
            newHours = newHours < 10 ? '0' + newHours : newHours;
            newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
            newSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
            var newTimeString = newHours + ':' + newMinutes + ':' + newSeconds;

            var newTimezone = (languageIndex === 1 || languageIndex === 2 || languageIndex === 3) ? ' (JST)' : '';

            if (languageIndex === 1) {
                textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + newDayOfWeek + ')' + newTimezone;
            } else {
                textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + newDayOfWeek + ')' + newTimezone;
            }

            textContainer.classList.remove('fade-out');
            textContainer.classList.add('fade-in');
        }, { once: true });
    }
}

updateClock();
setInterval(updateClock, 1000);
