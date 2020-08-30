$('#templates').carousel({
    interval: 10000
})

$('.carousel .carousel-item').each(function () {
    var minPerSlide = 3;
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});

//Markdown-it Render
var md = window.markdownit();
var output = document.querySelector('#output');
output.innerHTML = md.render(document.querySelector('#markdown').textContent);

document.querySelector('#markdown').addEventListener('keyup', function (e) {
    output.innerHTML = md.render(e.target.value);
});

autosize(document.querySelector('#markdown'));