WidgetMetadata = {
    id: "space.readonly.bangumi",
    title: "Bangumi",
    description: "Bangumi",
    author: "Space4",
    site: "https://github.com/space4yyy",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    modules: [
        {
            title: "每日放送",
            description: "bangumi每日放送，重新排序，今天放在最前面",
            requiresWebView: false,
            functionName: "loadCalendar",
        }
    ]
}

async function loadCalendar() {
    try {
        const response = await Widget.http.get("https://my-first-worker.space4.workers.dev/calendar");
        if (response.data) {
            const data = response.data;
            let currentDayIndex = (new Date()).getDay();
            currentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
            const reorderdData = [
                ...data.slice(currentDayIndex),
                ...data.slice(0, currentDayIndex),
            ];
            const bangumiIds = reorderdData.flatMap((item) => item.items.map((bangumi) => ({
                id: `tv.${bangumi.tmdb_id}`,
                type: "tmdb",
            })));
            return bangumiIds;
        } else {
            console.error("无法获取数据");
            throw new Error("无法获取数据");
        }
    } catch (error) {
        console.error("Error loading calendar:", error);
    }
}
