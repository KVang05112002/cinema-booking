const apiConfigs = {
    // baseUrl: 'https://api.themoviedb.org/3/',
    baseUrl: 'https://localhost:7181/api',
    //apikey: 'e880b4685229764e6a36b08769d2eae0',
    aPiRoom: 'https://localhost:7181/api',
    originalImage: (imgPath) => `${imgPath}`,
    w500Image: (imgPath) => `${imgPath}`,
    video: (videoPath) => `${videoPath}`
}

export default apiConfigs;