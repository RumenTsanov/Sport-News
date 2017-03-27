'use strict';

class Data {
    getData() {
        return ajaxRequester.get('/api/news');
    }

    getUsers() {
        return ajaxRequester.get('/api/users');
    }

    putNewsComment(uri, options) {
        return ajaxRequester.put('/api/news/' + uri, options);
    }

    getDataByURI(newsURI) {
        return ajaxRequester.get('/api/news/' + newsURI);
    }
    getDataByCategory(newsCategory) {
        return ajaxRequester.get('/api/categories/' + newsCategory);
    }

    postData() {
        $('#signup-btn').on('click', function() {
            let username = $('#userNameReg').val();
            let email = $('#emailReg').val();
            let password = $('#passReg').val();
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
                $('#butons-login').html(`Welcome ${username}! <a href="#/user-logout"> Logout!</a>`);
                return ajaxRequester.post('/api/users', options);
            }
        });
    }
    putData() {
        $('#login-btn').on('click', function() {
            // let username = $('#userNameLog').val();
            // let password = $('#passLog').val();
            // if (username === '' || password === '') {
            //     throw new Error('Invalid Log In!');
            // } else {

            //     let user = {
            //         username: username,
            //         password: password
            //     };
            //     console.log(user);
            //     let options = {
            //         data: user
            //     }
            //     $('#userNameLog').val('');
            //     $('#passLog').val('');
            //     $('#myModal .close').click();
            //     $('#butons-login').html('Welcome! <a href="#"> Logout!</a>');
            //     return ajaxRequester.put('/api/users', options);
            // }
        });
    }
}