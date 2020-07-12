
export async function getNewsAndComments(newsID) {
    const news = await mapToJson(newsID);
    news.comments = [];

    if ('kids' in news) {
        for (const id of news.kids) {
            const child = await getNewsAndComments(id);
            news.comments.push(child);
        }
    }

    return news;
}

function mapToJson(newsID) {

    return fetch(`https://hacker-news.firebaseio.com/v0/item/${newsID}.json`)
        .then((response => response.json()));
}
