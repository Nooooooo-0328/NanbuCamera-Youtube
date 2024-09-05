async function fetchEarthquakeData() {
    const response = await fetch("https://api.p2pquake.net/v2/history?codes=551&limit=1");
    const js_l = await response.json();

    let hypocenter = js_l[0]["earthquake"]["hypocenter"]["name"];
    let maxint = js_l[0]["earthquake"]["maxScale"];
    let depth = js_l[0]["earthquake"]["hypocenter"]["depth"];
    let magnitude = js_l[0]["earthquake"]["hypocenter"]["magnitude"];
    let type = js_l[0]["issue"]["type"];
    let _domesticTsunami = js_l[0]['earthquake']['domesticTsunami'];

    let shindo_, shindo__, domesticTsunami, domesticTsunami_emoji;

    const tickerContainerElement = document.querySelector('.ticker-container');
    tickerContainerElement.classList.remove(
        "shindo-0", "shindo-1", "shindo-2", "shindo-3", "shindo-4", 
        "shindo-5-", "shindo-5p", "shindo-6-", 
        "shindo-6p", "shindo-7"
    );

    switch (maxint) {
        case -1:
            shindo__ = "3";
            shindo_ = "-";
            tickerContainerElement.classList.add("shindo-0");
            break;
        case 10:
            shindo__ = "1";
            shindo_ = "1";
            tickerContainerElement.classList.add("shindo-1");
            break;
        case 20:
            shindo__ = "2";
            shindo_ = "2";
            tickerContainerElement.classList.add("shindo-2");
            break;
        case 30:
            shindo__ = "3";
            shindo_ = "3";
            tickerContainerElement.classList.add("shindo-3");
            break;
        case 40:
            shindo__ = "4";
            shindo_ = "4";
            tickerContainerElement.classList.add("shindo-4");
            break;
        case 45:
            shindo__ = "5";
            shindo_ = "5弱";
            tickerContainerElement.classList.add("shindo-5-");
            break;
        case 50:
            shindo__ = "5";
            shindo_ = "5強";
            tickerContainerElement.classList.add("shindo-5p");
            break;
        case 55:
            shindo__ = "6";
            shindo_ = "6弱";
            tickerContainerElement.classList.add("shindo-6-");
            break;
        case 60:
            shindo__ = "6";
            shindo_ = "6強";
            tickerContainerElement.classList.add("shindo-6+");
            break;
        case 70:
            shindo__ = "7";
            shindo_ = "7";
            tickerContainerElement.classList.add("shindo-7");
            break;
        default:
            tickerContainerElement.style.borderLeft = "none";
            break;
        }

    const tsunamiLevels = {
        'None': 'この地震による津波の心配はありません。',
        'Unknown': '津波の影響は不明です。',
        'Checking': '津波の影響を現在調査中です。',
        'NonEffective': '若干の海面変動が予想されますが、被害の心配はありません。',
        'Watch': 'この地震で 津波注意報 が発表されています。',
        'Warning': 'この地震で 津波警報等（ 大津波警報 ・ 津波警報 あるいは 津波注意報 ）が発表されています。'
    };

    const tsunamiLevels_emoji = {
        'None': '■',
        'Unknown': '■',
        'Checking': '■',
        'NonEffective': '■',
        'Watch': '⚠️',
        'Warning': '🚨'
    };

    domesticTsunami = tsunamiLevels[_domesticTsunami];
    domesticTsunami_emoji = tsunamiLevels_emoji[_domesticTsunami];

    let jmaDatetime = js_l[0]['earthquake']['time'];
    let jmaDatetime_time = "--日--時--分";
    try {
        jmaDatetime = new Date(jmaDatetime.replace(/\//g, "-"));
        jmaDatetime_time = `${jmaDatetime.getDate()}日${jmaDatetime.getHours()}時${jmaDatetime.getMinutes()}分`;
    } catch (error) {
        console.error("Date parsing error:", error);
    }

    let singen = hypocenter || '-';
    let singen_j = hypocenter ? `#${hypocenter} ` : '';
    let magu = magnitude !== -1 ? `M${magnitude}` : '-';
    let hukasa = depth !== -1 ? `約${depth}km` : '-';

    let pointsText = "各地の震度情報です。";
    let points = Array(10).fill("");
    const scales = {
        '-1': 9, '10': 8, '20': 7, '30': 6, '40': 5,
        '45': 4, '50': 3, '55': 2, '60': 1, '70': 0
    };
    const scalesText = {
        '-1': '', '10': '1', '20': '2', '30': '3', '40': '4', '45': '5弱', '50': '5強', '55': '6弱', '60': '6強', '70': '7'
    };
    let pointNameList = Array.from({ length: 10 }, () => []);

    for (let point of js_l[0]['points']) {
        let scale = scales[point['scale']];
        if (scale !== undefined) {
            let pointName = point['pref'];

            if (points[scale] === "") {
                points[scale] += ` [震度${scalesText[point['scale']]}]`;
            }

            if (!pointNameList[scale].includes(pointName)) {
                pointNameList[scale].push(pointName);
                points[scale] += ` ${pointName}: `;
            }

            points[scale] += `${point['addr']} `;
        }
    }

    for (let point of points) {
        pointsText += point;
    }

    version = "v 2.2.0"
    guidance = "   | [📌 ご案内] NanbuCameraの放送をご視聴いただきましてありがとうございます。本放送をご覧になられる方は必ず概要欄をご確認ください。 [🛑 本放送について] 本放送では、日本/韓国/台湾で地震が発生した際、音声と映像でお知らせいたします。急に音声が流れますので、音量にご注意ください。 [💻 使用ソフト] 本放送で使用しているソフトは以下の通りです。*印が付いているソフトは非配布ソフトです。 YDITS for Web / Nanbu Eq Service Bot Dev* / 強震モニタ / 사용자 맞춤형 지진정보서비스 / 地牛Wake Up! / Nanbu テロップ / Nanbu 時計 [🙏 開発者の皆様に感謝いたします。 | ⚠️ 配信の安定性について] 本放送は、できる限り安定した放送を心がけていますが、予期せぬトラブルにより配信が一時停止する場合がございます。その際は、ご理解のほどよろしくお願いいたします。 [📬 お問い合わせ] 本放送に関する、お問い合わせ又はご質問はX(旧: Twitter) @NanbuCamera まで、お願いいたします。 | " + version

    let info;
    switch (type) {
        case "ScalePrompt":
            info = "震度速報";
            text = `[📣 ${info}] ${jmaDatetime_time}ごろ、最大震度${shindo_}を観測する地震がありました。新しい情報が入り次第お伝え致します。`
            break;
        case "Destination":
            info = "震源に関する情報";
            text = `[📣 ${info}] ${jmaDatetime_time}ごろ、${singen}で地震がありました。を観測する地震がありました。新しい情報が入り次第お伝え致します。`
            break;
        case "ScaleAndDestination":
            info = "震源 ・ 震度に関する情報";
            text = `[📣 ${info}] ${jmaDatetime_time}ごろ、${singen}を震源とする、最大震度${shindo_}を観測する地震がありました。`
            break;
        case "DetailScale":
            info = "各地の震度に関する情報";
            text = `[📣 ${info}] ${jmaDatetime_time}ごろ、${singen}を震源とする、最大震度${shindo_}を観測する地震がありました。マグニチュードは${magu}、深さは${hukasa}と推定されています。${domesticTsunami}` + guidance
            break;
        case "Foreign":
            info = "遠地地震に関する情報";
            text = `[📣 ${info}] ${jmaDatetime_time}ごろ、${singen}で地震がありました。マグニチュードは${magu}、${domesticTsunami}` + guidance
            break;
        default:
            info = "その他";
    }

    let Quake_text = text;
    let tickerText = Quake_text;

    const tickerElement = document.getElementById('ticker-text');
    tickerElement.innerText = tickerText;

    const animationDuration = Math.max(tickerText.length * 0.1, 20);
    tickerElement.style.animationDuration = `${animationDuration}s`;
}

fetchEarthquakeData();

setInterval(fetchEarthquakeData, 20000);
