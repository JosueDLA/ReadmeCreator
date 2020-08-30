/* Markdown Render */
window.onload = function () {
    let md = window.markdownit();
    loadFile('./docs/Basic-readme-en.md', md);

    document.querySelector('#markdown').addEventListener('keyup', function (e) {
        output.innerHTML = md.render(e.target.value);
    });
}

function loadFile(file, md) {
    let raw = new XMLHttpRequest();
    raw.open('GET', file, true);
    raw.send();

    raw.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let text = raw.responseText;

            let textArea = document.querySelector('#markdown');
            let output = document.querySelector('#output');

            //Markdown-it Render
            textArea.innerHTML = text;
            output.innerHTML = md.render(text);

            autosize(document.querySelector('#markdown'));
        }
    };
}

/* Carousel */
$('#templates').carousel({
    interval: 10000
});

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