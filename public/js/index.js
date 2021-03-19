var supermarker = (function() {
    var ui;

    var bindUI = function() {
        ui.btn__uploadPictures = $('.btn__uploadPictures');
    }

    var bindEvents = function() {

    }

    var onPageLoad = function() {
        feather.replace();
    }

    var init = function() {
        onPageLoad();
        bindUI();
        bindEvents();
    }

    return {
        init
    }
})();


$(document).ready(function() {
    supermarker.init();
});
