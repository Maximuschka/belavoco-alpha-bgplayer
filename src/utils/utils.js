import { AsyncStorage } from 'react-native';

const utils = {
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    logoutUserInDebug() {
        const userdata = utils.makeInitialUserJSON();
        console.log(userdata);
        AsyncStorage.setItem('userdata', JSON.stringify(userdata));
    },
    makeUserJSON(username, useremail, userhash, onesignalid) {
        const obj = new Object();
        obj.username = username;
        obj.useremail = useremail;
        obj.userhash = userhash;
        obj.onesignalid = onesignalid;
        return obj;
    },
    makeInitialUserJSON() {
        const obj = new Object();
        obj.username = 'null';
        obj.useremail = 'null';
        obj.userhash = 'null';
        obj.onesignalid = 'null';
        return obj;
    },
    async updateUserJSON(parameter, value) {
        try {
            const retrievedItem = await AsyncStorage.getItem('userdata');
            const userdata = JSON.parse(retrievedItem);
            if (parameter === 'email') {
                console.log('Updating User Email');
                userdata.useremail = value;
            } else if (parameter === 'hash') {
                console.log('Updating User Hash');
                userdata.userhash = value;
            } else if (parameter === 'name') {
                console.log('Updating User Name');
                userdata.username = value;
            } else if (parameter === 'onesignalid') {
                console.log('Updating Onesignal ID');
                userdata.onesignalid = value;
            }
            AsyncStorage.setItem('userdata', JSON.stringify(userdata));
            return userdata;
        } catch (error) {
            console.log(error.message);
          }
        return;
    },
    async getUserParameter(parameter) {
        try {
            const retrievedItem = await AsyncStorage.getItem('userdata');
            let userdata = JSON.parse(retrievedItem);
            if (userdata === null) {
                console.log('First login: JSON with entries null created (in getUserParameter())');
                userdata = utils.makeInitialUserJSON();
            }
            if (parameter === 'email') {
                console.log('Requesting User Email');
                if (userdata.useremail === 'null') {
                    userdata.useremail = null;
                  }
                return userdata.useremail;
            } else if (parameter === 'hash') {
                console.log('Requesting User Hash');
                if (userdata.userhash === 'null') {
                    userdata.userhash = null;
                  }
                return userdata.userhash;
            } else if (parameter === 'name') {
                console.log('Requesting User Name');
                if (userdata.username === 'null') {
                    userdata.username = null;
                  }
                return userdata.username;
            } else if (parameter === 'onesignalid') {
                console.log('Requesting Onesignal ID');
                if (userdata.onesignalid === 'null') {
                    userdata.onesignalid = null;
                  }
                return userdata.onesignalid;
            } else if (parameter === 'all') {
                console.log('Requesting All');
                return userdata;
            }
        } catch (error) {
            console.log(error.message);
          }
        return;
    },
    async getPlayId() {
        const playId = await AsyncStorage.getItem('onesignalplayid');
        return playId;
    },
    function5() {
        console.log(5);
    },
    function6() {
        console.log(6);
    },
};

export default utils;
