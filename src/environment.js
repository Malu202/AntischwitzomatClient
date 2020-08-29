let API_URL = "https://antischwitzomat.glitch.me/";
if (__ENVIRONMENT == "local") {
    API_URL = "http://127.0.0.1:61909/";
}

export const environment = {
    API_URL: API_URL,
    api: `${API_URL}measurements`,
    ROOM_MEASUREMENTS: `${API_URL}roommeasurements`,
    NOTIFICATIONS_URL: `${API_URL}notifications`,
    NOTIFICATION_PUBLIC_KEY: 'BPpC0dcJVJWCBwjKNWPJW4o75bZpfiqUtGAU3Du18npgjqtCDqfWLMbHjIkMQAbDvcuPbP5eLfL9ZDSxilOFq0I'
};
