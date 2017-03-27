const router = {
    init: $(() => {
        const appRouter = new Navigo(null, true);

        const data = new Data();

        let currentURI;

        appRouter
            .on({
                '/home': () => {
                    let usernameLoc = localStorage.getItem('username');
                    if (usernameLoc !== null && usernameLoc !== undefined && usernameLoc !== '') {
                        $('#butons-login').html(`Welcome ${usernameLoc}! <a href="#/user-logout"> Logout!</a>`);
                    }
                    data.getData()
                        .then((dataObj) => {

                            templateLoader.compile('home')
                                .then(function(tempalte) {
                                    let mainNews = {
                                        main1: dataObj[0],
                                        main2: dataObj[1],
                                        main3: dataObj[2],
                                        main4: dataObj[3],
                                        main5: dataObj[4],
                                        main6: dataObj[5],
                                        main7: dataObj[6],
                                        main8: dataObj[7],
                                        main9: dataObj[8],
                                        main10: dataObj[9],
                                        main11: dataObj[10],
                                        main12: dataObj[11],
                                        main13: dataObj[12],
                                        main14: dataObj[13],
                                        main15: dataObj[14]

                                    };
                                    $('#content').html(tempalte(mainNews));
                                });
                        });

                }

            })
            .on({
                '/post-user': () => {
                    data.postData();
                    appRouter.navigate('/home');
                }
            })
            .on({
                '/user-logout': () => {
                    localStorage.clear();
                    $('#butons-login').html(`<a href="#"><i class="fa fa-facebook-square" style="font-size:20px"></i></a>
                    <a href="#"><i class="fa fa-twitter-square" style="font-size:20px"></i></a>
                    <a href="#"><i class="fa fa-google-plus-square" style="font-size:20px"></i></a>
                    <a href="#"><i class="fa fa-youtube-square" style="font-size:20px"></i></a>
                    <a href="#"><i class="fa fa-vimeo-square" style="font-size:20px"></i></a>
                    <a href="#"><i class="fa fa-pinterest-square" style="font-size:20px"></i></a>
                    <a href="#" id="login-link" data-toggle="modal" data-target="#myModal">Login</a> / <a href="#" id="signup-link" data-toggle="modal" data-target="#myModal1">Signup</a>`);
                    appRouter.navigate('/home');
                }
            })
            .on({
                '/put-user': () => {
                    //data.putData();  
                    let username = $('#userNameLog').val();
                    let password = $('#passLog').val();

                    //let allUsers;

                    data.getUsers()
                        .then((dataUsers) => {
                            return dataUsers;
                        })
                        .then((dataUsers) => {
                            dataUsers.forEach((currentUser) => {
                                if (username === currentUser.username && password === currentUser.password) {
                                    localStorage.setItem('username', username);
                                    $('#userNameLog').val('');
                                    $('#passLog').val('');
                                    $('#myModal .close').click();
                                    $('#butons-login').html(`Welcome ${username}! <a href="#/user-logout"> Logout!</a>`);
                                }
                            });
                        });
                    appRouter.navigate('/home');
                }
            })
            .on({
                '/categories/:category': (params) => {
                    data.getDataByCategory(params.category)
                        .then((dataObj) => {
                            console.log(dataObj[0].category);
                            switch (dataObj[0].category) {
                                case 'FOOTBALL':
                                    templateLoader.compile('football')
                                        .then(function(tempalte) {
                                            let footballNews = {
                                                football1: dataObj[0],
                                                football2: dataObj[1],
                                                football3: dataObj[2],
                                                football4: dataObj[3],
                                                football5: dataObj[4],
                                                football6: dataObj[5]
                                            };
                                            $('#content').html(tempalte(footballNews));
                                        });
                                    break;
                                case 'BASKETBALL':
                                    templateLoader.compile('basketball')
                                        .then(function(tempalte) {
                                            let basketballNews = {
                                                basketball1: dataObj[0],
                                                basketball2: dataObj[1],
                                                basketball3: dataObj[2],
                                                basketball4: dataObj[3],
                                                basketball5: dataObj[4],
                                                basketball6: dataObj[5]
                                            };
                                            $('#content').html(tempalte(basketballNews));
                                        });
                                    break;
                                case 'TENNIS':
                                    templateLoader.compile('tennis')
                                        .then(function(tempalte) {
                                            let tennisNews = {
                                                tennis1: dataObj[0],
                                                tennis2: dataObj[1],
                                                tennis3: dataObj[2],
                                                tennis4: dataObj[3],
                                                tennis5: dataObj[4],
                                                tennis6: dataObj[5]
                                            };
                                            $('#content').html(tempalte(tennisNews));
                                        });
                                    break;
                                case 'FIGHT SPORTS':
                                    templateLoader.compile('fight-sports')
                                        .then(function(tempalte) {
                                            let fightNews = {
                                                fight1: dataObj[0],
                                                fight2: dataObj[1],
                                                fight3: dataObj[2],
                                                fight4: dataObj[3],
                                                fight5: dataObj[4],
                                                fight6: dataObj[5]
                                            };
                                            $('#content').html(tempalte(fightNews));
                                        });
                                    break;
                            }
                        });
                }
            })
            .on({
                '/single-news/:uri': (params) => {
                    data.getDataByURI(params.uri)
                        .then((dataObj) => {
                            currentURI = params.uri;
                            templateLoader.compile('single-news')
                                .then(function(tempalte) {
                                    $('#content').html(tempalte(dataObj[0]));
                                });
                        });

                }

            })
            .on({
                '/comment': () => {
                    let inputValue = $('#comments-text').val();
                    console.log(inputValue);
                    if (inputValue !== '') {
                        let comment = { value: inputValue, username: localStorage.getItem('username') };
                        let options = {
                            data: { comment: comment }
                        };
                        console.log(options);
                        $('#comments-text').val('');
                        data.putNewsComment(currentURI, options).then((d) => {
                            console.log(d);
                            appRouter.navigate('/single-news/' + currentURI);
                        });

                    }
                }

            })
            .on({
                '/': () => {
                    appRouter.navigate('/home');
                }
            })
            .notFound(function() {
                alert('Error! Router not found!');
            })
            .resolve();
    })
}