let API_URL = "https://antischwitzomat.glitch.me/";
if (__ENVIRONMENT == "local") {
    API_URL = "http://127.0.0.1:1337/";
}

export const environment = {
    API_URL: API_URL,
    api: `${API_URL}measurements`,
    NOTIFICATIONS_URL: `${API_URL}notifications`,
    NOTIFICATION_PUBLIC_KEY: 'BPpC0dcJVJWCBwjKNWPJW4o75bZpfiqUtGAU3Du18npgjqtCDqfWLMbHjIkMQAbDvcuPbP5eLfL9ZDSxilOFq0I'
};
