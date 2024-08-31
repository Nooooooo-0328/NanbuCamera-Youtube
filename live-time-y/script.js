
let type = -1;
const texts = [
    {
        label: "X メイン",
        text: "@NanbuCamera"
    },
    {
        label: "X 地震Bot",
        text: "@NanbuEqService"
    },
    {
        label: "Discord 雑談鯖",
        text: "discord.gg/Z8aqnkfZCU"
    },
    {
        label: "機能 Version",
        text: "0.0.1 (β)"
    },
    {
        label: "協力",
        text: "よね/Yone"
    },
];


(() => {
    document.addEventListener("DOMContentLoaded", () => {
        const statusElement = document.getElementById("statusWrapper");
        const statusLabelElement = document.getElementById("statusLabel");
        const statusTextElement = document.getElementById("statusText");
        const statusElements = {
            wrapper: statusElement,
            label: statusLabelElement, 
            text: statusTextElement
        }
       
        setInterval(updateTime, 1000);
        setInterval(() => animation(statusElements), 1000 * 10);
        animation(statusElements);
        updateTime();
    });
})();


function updateTime() {
    const now = new Date();
    const days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

    const day = days[now.getDay()];
    const date = now.toISOString().slice(0, 10).replace(/-/g, "/");
    const time = now.toTimeString().slice(0, 8);

    document.getElementById('day').textContent = day;
    document.getElementById('date').textContent = date;
    document.getElementById('time').textContent = time;
}


function animation(elements) {
    elements.wrapper.classList.add("hide");
    setTimeout((elements) => {


        type++;

        if (type >= texts.length) {
          type = 0
        }

        console.debug(texts[type].label, texts[type].text);

        elements.label.innerText = texts[type].label || "error";
        elements.text.innerText = texts[type].text || "error";
    
        if (elements.text.innerText.length >= 18) {
            elements.text.style.fontSize = "1.3rem";
        } else  if (elements.text.innerText.length >= 12) {
            elements.text.style.fontSize = "1.7rem";
        } else {
            elements.text.style.fontSize = "2.2rem";
        }

        elements.wrapper.classList.remove("hide");
    }, 500, elements)
}