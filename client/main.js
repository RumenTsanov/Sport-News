"use strict";

const data = new Data();

$(function() {
    router.init;
});

$('#liveNews').on('mouseover', function() {
    $(this).css('position', 'fixed');
});

$("#search-button").on("click", function() {
    data.getData()
        .then(function(dataObj) {
            let searchVal = $('#search-criteria').val();
            console.log(searchVal[0]);
            let len = dataObj.length;
            console.log(len);
            let result;
            for (let i = 0; i < len; i += 1) {
                result = dataObj[i].title;
                if (result === searchVal) {
                    console.log("here");

                }
            }
            console.log(result);
            $('#search-criteria').val('');
        });
});

// $('.comments-buttton').on('click', function(context) {
//     let inputValue = $('.comments-area').val();
//     if (inputValue !== '') {
//         let comment = { value: inputValue, user: localStorage.getItem('username') };
//         let options = {
//             data: { comment: comment }
//         };
//         console.log(options);
//         $('.comments-area').val('');

//         data.putNewsComment(currentURI, options).then((d) => {
//             console.log(d);
//             appRouter.navigate('/news/' + currentURI);
//         });
//     }
// });