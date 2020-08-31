/* Markdown Render */
window.onload = function () {
    /* Cards */
    loadCards();

    let md = window.markdownit();
    loadFile('./docs/Basic-readme-en.md');

    document.querySelector('#markdown').addEventListener('keyup', function (e) {
        output.innerHTML = md.render(e.target.value);
    });
}

/* Load Cards */
function loadCards() {
    let fileUrl = './docs/Files.json';
    let files = new XMLHttpRequest();
    files.open('GET', fileUrl, true);
    files.send();

    files.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let data = JSON.parse(this.responseText);

            let cards = document.querySelector('#cards');
            let indicators = document.querySelector('#indicators');

            for (let i = 0; i < data.length; i++) {
                let content = `
                    <div class="col-md-4 col-12">
                        <div class="card text-white bg-dark h-100">
                            <div class="card-header"> ${data[i].language} </div>
                            <div class="card-body">
                                <h5 class="card-title"> ${data[i].title} </h5>
                                <p class="card-text"> ${data[i].description} </p>
                                <button id="${data[i].file}" class="btn btn-primary load-readme">Load</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                if (i == 0) {
                    indicators.innerHTML += `<li data-targer="#templates" data-slide-to="${i}" class="active"></li>`;
                    cards.innerHTML += '<div class="carousel-item active">' + content;
                }
                else {
                    indicators.innerHTML += `<li data-targer="#templates" data-slide-to="${i}"></li>`;
                    cards.innerHTML += '<div class="carousel-item">' + content;
                }

            }
            addButtonEvents();
            carousel();
        }
    };
}

/* Add Button Events */
function addButtonEvents() {
    document.querySelectorAll('.load-readme').forEach(function (element) {
        element.addEventListener('click', function () {
            loadFile(this.id);
        })
    });
}

/* Carousel */
function carousel() {
    $('#templates').carousel({
        interval: 10000
    });

    $('.carousel .carousel-item').each(function () {
        let minPerSlide = 3;
        let next = $(this).next();
        console.log(next);
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
}

/* Load Files */
function loadFile(file) {
    console.log(file);
    let md = window.markdownit();
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

/* Download Files */
function downloadFile(content, name) {
    let file = new Blob([content], { type: 'text/plain' });
    let link = document.createElement('a');
    link.download = name;
    link.innerHTML = "Download";

    if (window.webkitURL != null) {
        //For Chrome
        link.href = window.webkitURL.createObjectURL(file);
    }
    else {
        //For Other Browsers
        link.href = window.URL.createObjectURL(file);
        link.onclick = destroyClickedElement;
        link.style.display = 'none';
        document.body.appendChild(link);
    }
    link.click();
}