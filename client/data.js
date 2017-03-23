'use strict';

class Data {
    getData() {
        return ajaxRequester.get('/api/news');
    }

    getDataById(newsId) {
        return ajaxRequester.getById('/api/news/' + newsId);
    }

    postData() {
        $('#signup-btn').on('click', function() {
            let username = $('#userNameReg').val();
            let email = $('#emailReg').val();
            let password = $('#passReg').val();

            console.log('POST ...');

            if (username === '' || email === '' || password === '') {
                throw new Error('Invalid registration!');
            } else {
                let newUser = {
                    username: username,
                    email: email,
                    password: password
                };
                console.log(newUser);
                let options = {
                    data: newUser
                };
                console.log(options);
                $('#userNameReg').val('');
                $('#emailReg').val('');
                $('#passReg').val('');
                $("#myModal1 .close").click();
                $('#butons-login').html('Welcome! <a href="#"> Logout!</a>');
                return ajaxRequester.post('/api/users', options);
            }
        });
    }
}