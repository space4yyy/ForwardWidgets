WidgetMetadata = {
    id: "space.readonly.douban",
    title: "豆瓣",
    description: "豆瓣",
    author: "Space4",
    site: "https://github.com/space4yyy",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    modules: [
        {
            title: "豆瓣 - 我的想看",
            description: "豆瓣 - 我的想看",
            requiresWebView: false,
            functionName: "loadWish",
            params: [
                {
                    name: "userId",
                    title: "豆瓣用户id",
                    type: "input",
                    description: "豆瓣用户id",
                },
                {
                    name: "start",
                    title: "开始",
                    type: "page",
                },
                {
                    name: "limit",
                    title: "每页数量",
                    type: "constant",
                    value: "20",
                },
            ],
        },
    ],
};

async function loadWish(params = {}) {
    const userId = params.userId;
    if (!userId) {
        console.error("无法获取用户 ID");
        throw new Error("无法获取用户 ID");
    }

    const start = params.start || 0;
    const limit = params.limit || 20;
    let pageUrl = `https://m.douban.com/rexxar/api/v2/user/${userId}/interests?start=${start}&count=${limit}`;
    const response = await Widget.http.get(pageUrl, {
        headers: {
            Referer: `https://m.douban.com/`,
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
    });
    if (response.data.interests) {
        const items = response.data.interests;
        const doubanIds = items.map((item) => ({
            id: item.subject.id,
            type: "douban",
        }));
        return doubanIds;
    }
    return [];
}
