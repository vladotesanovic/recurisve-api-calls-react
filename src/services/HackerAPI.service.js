const LEVELS_TO_LOAD = 1;

export async function getNewsAndComments(newsID, level = 0) {

    const news = await mapToJson(newsID);
    news.comments = [];

    if ('kids' in news) {
        level += 1;
        if (level <= LEVELS_TO_LOAD) {
            for (const id of news.kids) {
                news.comments.push(
                    await getNewsAndComments(id, level)
                );
            }
        }
    }

    return news;
}

function mapToJson(newsID) {

    return fetch(`https://hacker-news.firebaseio.com/v0/item/${newsID}.json`)
        .then((response => response.json()));
}
