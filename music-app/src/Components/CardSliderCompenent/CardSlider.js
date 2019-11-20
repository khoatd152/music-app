/* eslint-disable no-undef */
$(document).ready(function () {
    $('.next').click(function (e) {

        let parent = $(e.target).parent()[0];
        let id = parent.dataset.id;
        console.log(parent, id)
        $('#' + id).carousel('next'); return false;
    });
    $('.prev').click(function (e) {
        let parent = $(e.target).parent()[0];
        let id = parent.dataset.id;
        $('#' + id).carousel('prev'); return false;
    });
});