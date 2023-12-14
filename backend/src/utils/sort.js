export function sortTweetsByDate(tweets) {
    return tweets.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        return dateB - dateA;
    });
}