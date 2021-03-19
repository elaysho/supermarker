var supermarker = (function() {
    var ui, images = [], reader;

    var bindUI = function() {
        ui = {};

        ui.btn__uploadPictures = $('.btn__uploadPictures');
        ui.uploadFile = $('#uploadFile');
    }

    var bindEvents = function() {
        ui.btn__uploadPictures.on('click', onUploadPictures);
        ui.uploadFile.on('change', onUploadSelect);
    }

    var onUploadPictures = function() {
        $('#uploadFile').click();
    }

    var onUploadSelect = function() {
        images = document.querySelector('input[type=file]').files;
        Swal.fire({
            title: 'Preview',
            html: createPicturePreview(images),
            didOpen: () => {
                $.each(images, function(i, image) {
                    reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = function(e) {
                        $('.swImage__' + (i + 1)).attr('src', e.target.result);
                    }

                });
            },
            preConfirm: () => {
                return new Promise(function(resolve) {
                    resolve($('.watermark__text').val());
                });
            }
        }).then((result) => {
            console.log(result);

            Swal.fire({
                title: 'Watermarked',
                html: '<p> Here are your watermarked images. </p>',
                didOpen: () => {
                    console.log(result.value);

                    $.each(images, function(i, image) {
                        var rotate = function(target) {
                            var context = target.getContext('2d');
                            var text    = result.value;
                            var metrics = context.measureText(text);

                            var x = (metrics.width) + (10);
                            var y = (metrics.width) + (10);
                          
                            context.translate(x, y);
                            context.globalAlpha = 0.65;
                            context.fillStyle = '#000';
                            context.font = '164px Josefin Slab';
                            context.rotate(-20 * Math.PI / 180);
                            context.fillText(text, 0, 0);
                            return target;
                        };

                        watermark([image])
                            .image(rotate).render()
                            // .image(rotate).render()
                            .then(function (img) {
                                $('.swal2-html-container').append(img);
                                $(img).attr('class', 'swImage__watermarked');
                            });
                  
                    });
                }
            });
        });
    }

    var createPicturePreview = function(files) {
        var html = '<p> Here\'s a preview of the pictures you selected';
        html    += '<div class="p-3" style="display: inline-block">';

        $.each(files, function(i, file) {
            if(file) {
                var imageElement = '<img class="w-50 swImage swImage__' + (i + 1) + '" class="mx-3" style="background-size: cover; border-radius: 5px;">';
                html += imageElement;
            }
        });

        html += '<input type="text" class="swal2-input watermark__text" placeholder="Enter text to put on as watermark">';
        html += '</div>';
        return html
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
