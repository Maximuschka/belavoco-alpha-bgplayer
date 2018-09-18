import axios from 'axios';

const apiUtils = {
    addLike(hash) {
        axios.get('https://www.belavo.co/api/set/' + hash + '/like')
        .catch(e => console.log(e));
    },
    substractLike(hash) {
        axios.get('https://www.belavo.co/api/set/' + hash + '/unlike')
        .catch(e => console.log(e));
    },
    function6() {
        console.log(6);
    },
};

export default apiUtils;
