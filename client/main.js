"use strict";
$(function() {
    router.init;
});


$('#live-score-aside').click(function(link) {
    link.preventDefault();
});

$('.live-news').mouseover(function() {
    $(this).stop();
});

$("#search-criteria").on("keyup", function() {
    let g = $(this).val().toLowerCase();
    $("#main-news news").forEach(function() {
        let s = $(this).text().toLowerCase();

    });
});