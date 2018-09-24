import axios from 'axios';

let randomAudiobook;

const apiUtils = {
    addLike(hash) {
        axios.get('https://www.belavo.co/api/set/' + hash + '/like')
        .catch(e => console.log(e));
    },
    substractLike(hash) {
        axios.get('https://www.belavo.co/api/set/' + hash + '/unlike')
        .catch(e => console.log(e));
    },
    loadRandomAudiobook() {
        axios.get('https://www.belavo.co/api/get/all')
        .then((response) => {
            randomAudiobook = response.data;
            console.log('name is ', randomAudiobook);
            return randomAudiobook;
        });
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
    function7() {
        console.log(7);
    },
};

export default apiUtils;
