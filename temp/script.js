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

    switch (maxint) {
        case -1:
            shindo__ = "3";
            shindo_ = "-";
            break;
        case 10:
            shindo__ = "1";
            shindo_ = "1";
            break;
        case 20:
            shindo__ = "2";
            shindo_ = "2";
            break;
        case 30:
            shindo__ = "3";
            shindo_ = "3";
            break;
        case 40:
            shindo__ = "4";
            shindo_ = "4";
            break;
        case 45:
            shindo__ = "5";
            shindo_ = "5弱";
            break;
        case 50:
            shindo__ = "5";
            shindo_ = "5強";
            break;
        case 55:
            shindo__ = "6";
            shindo_ = "6弱";
            break;
        case 60:
            shindo__ = "6";
            shindo_ = "6強";
            break;
        case 70:
            shindo__ = "7";
            shindo_ = "7";
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

    let info;
    switch (type) {
        case "ScalePrompt":
            info = "震度速報";
            text = `${jmaDatetime_time}ごろ、最大震度${shindo_}を観測する地震がありました。新しい情報が入り次第お伝え致します。`
            break;
        case "Destination":
            info = "震源に関する情報";
            text = `${jmaDatetime_time}ごろ、${singen}で地震がありました。を観測する地震がありました。新しい情報が入り次第お伝え致します。`
            break;
        case "ScaleAndDestination":
            info = "震源 ・ 震度に関する情報";
            text = `${jmaDatetime_time}ごろ、${singen}を震源とする、最大震度${shindo_}を観測する地震がありました。`
            break;
        case "DetailScale":
            info = "各地の震度に関する情報";
            text = `${jmaDatetime_time}ごろ、${singen}を震源とする、最大震度${shindo_}を観測する地震がありました。マグニチュードは${magu}、深さは${hukasa}と推定されています。${domesticTsunami}`
            break;
        case "Foreign":
            info = "遠地地震に関する情報";
            text = `${jmaDatetime_time}ごろ、${singen}で地震がありました。マグニチュードは${magu}、${domesticTsunami}`
            break;
        default:
            info = "その他";
    }

    let Quake_text = text;
    let guidance = "  | 📌 NanbuCameraの配信をご視聴いただきありがとうございます。この配信はNanbuCameraが地震監視を行っている配信となっています。地震が発生したら音声・映像でお知らせいたします。このテロップはβ版のため、不具合が発生する可能性があります。バグ等ありましたら X (旧: Twitter): @NanbuCamera まで、お願いいたします。"
    let tickerText = Quake_text + guidance;

    const tickerElement = document.getElementById('ticker-text');
    tickerElement.innerText = tickerText;

    const animationDuration = Math.max(tickerText.length * 0.1, 20);
    tickerElement.style.animationDuration = `${animationDuration}s`;
}

fetchEarthquakeData();

setInterval(fetchEarthquakeData, 20000);
