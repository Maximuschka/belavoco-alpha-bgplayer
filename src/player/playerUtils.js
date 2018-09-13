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
    currentProgress() {
        console.log('########################');
        RNAudioStreamer.duration((err, duration) => {
            length = duration;
           });
        console.log('Länge: ' + length);

        RNAudioStreamer.currentTime((err, currentTime) => {
            console.log('currentTIme: ' + currentTime);
            position = currentTime;
        });
        console.log('Position: ' + position);
        if (length > 0) {
            progress = (position / length) * 100;
            console.log('Progress: ' + progress);
        }
        return progress;
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

