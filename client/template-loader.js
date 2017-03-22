let templateLoader = {

    compile: (templateName, data) => {
        let url = `./templates/${templateName}.handlebars`;

        return new Promise((resolve, reject) => {
            $.get(url, (htmlTemplate) => {
                let compiledTemplate = Handlebars.compile(htmlTemplate);
                resolve(compiledTemplate);
            });
        });
    }
};