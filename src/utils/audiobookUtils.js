const audiobookUtils = {
    getRandomAudiobook(audiobooks) {
        const randomNumber = Math.floor(Math.random() * (audiobooks.length - 1));
        return audiobooks[randomNumber];
    },
    function5() {
        console.log(5);
    },
    function6() {
        console.log(6);
    },
};

export default audiobookUtils;

