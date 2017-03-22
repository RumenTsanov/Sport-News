const router = {
    init: $(() => {
        const appRouter = new Navigo(null, true);

        const data = new Data();

        appRouter
            .on({
                '/home': () => {
                    data.getData()
                        .then((dataObj) => {
                            console.log(dataObj[0]);
                            templateLoader.compile('home')
                                .then(function(tempalte) {
                                    let mainNews = {
                                        main1: dataObj[0],
                                        main2: dataObj[1],
                                        main3: dataObj[2]
                                    }
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
                '/football': () => {
                    templateLoader.compile('football')
                        .then(function(tempalte) {
                            $('#content').html(tempalte);
                        });
                }
            })
            .on({
                '/single-news': () => {
                    templateLoader.compile('single-news')
                        .then(function(tempalte) {
                            $('#content').html(tempalte);
                        });
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