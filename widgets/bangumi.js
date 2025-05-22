WidgetMetadata = {
    id: "space.readonly.bangumi",
    title: "Bangumi",
    description: "Bangumi",
    author: "Space4",
    site: "https://github.com/space4yyy",
    version: "1.0.1",
    requiredVersion: "0.0.1",
    modules: [
        {
            title: "bangumi每日放送",
            description: "bangumi每日放送表",
            requiresWebView: false,
            functionName: "loadCalendar",
            params: [
                {
                    name: "day",
                    title: "选择星期",
                    type: "enumeration",
                    description: "枚举",
                    value: "0",
                    enumOptions: [
                        {
                            title: "星期一",
                            value: "0"
                        },
                        {
                            title: "星期二",
                            value: "1"
                        },
                        {
                            title: "星期三",
                            value: "2"
                        },
                        {
                            title: "星期四",
                            value: "3"
                        },
                        {
                            title: "星期五",
                            value: "4"
                        },
                        {
                            title: "星期六",
                            value: "5"
                        },
                        {
                            title: "星期日",
                            value: "6"
                        }
                    ]
                },
            ]
        }
    ]
}

async function loadCalendar(params = {}) {
    try {
        const response = await Widget.http.get("https://bangumi.space4.workers.dev/calendar");
        if (response.data) {
            const data = response.data;
            const weekday = Number(params.day) || 0;
            const bangumi_ids = data[weekday].items.map((bangumi) => ({
                title: bangumi.name_cn && bangumi.name_cn.trim() !== "" ? bangumi.name_cn : bangumi.name,
                id: String(bangumi.tmdbId),
                posterPath: bangumi.images.large,
                releaseDate: bangumi.air_date,
                rating: bangumi.score,
                type: "tmdb",
                mediaType: "tv",
            }));
            console.log(bangumi_ids);
            return bangumi_ids;
        } else {
            console.error("无法获取数据");
            throw new Error("无法获取数据");
        }
    } catch (error) {
        console.error("Error loading calendar:", error);
    }
}
