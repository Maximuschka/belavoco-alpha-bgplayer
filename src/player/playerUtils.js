import RNAudioStreamer from 'react-native-audio-streamer';

let length = 0;
let position = 0;
let progress = 0;

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
    getProgress() {
        RNAudioStreamer.duration((err, duration) => {
            length = duration;
           });

        RNAudioStreamer.currentTime((err, currentTime) => {
            position = currentTime;
        });
        if (length > 0) {
            progress = (position / length);
        }
        return [progress, position, length];
    },
    function4() {
        console.log(4);
    },
    function5() {
        console.log(5);
    },
    function6() {
        console.log(6);
    },
};

export default playerUtils;

