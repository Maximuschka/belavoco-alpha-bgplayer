import RNAudioStreamer from 'react-native-audio-streamer';

const playerUtils = {
    startAudioBook(audiobookURL) {
        RNAudioStreamer.setUrl(audiobookURL);
        RNAudioStreamer.play();
    },
    playAudioBook() {
        RNAudioStreamer.play();
    },
    pauseAudioBook() {
        RNAudioStreamer.pause();
    },
    function3() {
        console.log(3);
    },
    function4() {
        console.log(4);
    },
};

export default playerUtils;

