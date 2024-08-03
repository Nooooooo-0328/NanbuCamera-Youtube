//  Nooooooo  //
//  改変や複製を一切禁止します。  //
//  https://github.com/Nooooooo-0328/Clock-site  //

var languageIndex = 0;
var languages = ["NanbuCamera 配信放送 | ", "NanbuCamera Broadcasting | ", "NanbuCamera 방송 | "];
var dayOfWeekLabels = [
    ['日', '月', '火', '水', '木', '金', '土'], 
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 
    ['일', '월', '화', '수', '목', '금', '토'] 
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

    if (languageIndex === 1) {
        textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + dayOfWeek + ')' + ' (Japan Time)';
    } else {
        textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + dayOfWeek + ')';
    }

    if (now.getSeconds() % 10 === 0) {
        languageIndex = (languageIndex + 1) % languages.length;
        textContainer.classList.remove('fade-in');
        textContainer.classList.add('fade-out');
        setTimeout(function() {
            var newDayOfWeek = dayOfWeekLabels[languageIndex][now.getDay()]; 
            var newHours = now.getHours(); 
            var newMinutes = now.getMinutes(); 
            var newSeconds = now.getSeconds(); 
            newHours = newHours < 10 ? '0' + newHours : newHours;
            newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
            newSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
            var newTimeString = newHours + ':' + newMinutes + ':' + newSeconds;

            if (languageIndex === 1) {
                textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + newDayOfWeek + ')' + ' (Japan Time)';
            } else {
                textContainer.textContent = languages[languageIndex] + ' ' + month + '/' + date + ' (' + newDayOfWeek + ')';
            }

            textContainer.classList.remove('fade-out');
            textContainer.classList.add('fade-in');
        }, 1000); 
    }
}

updateClock();
setInterval(updateClock, 1000);