document.addEventListener('DOMContentLoaded', () => {
    initNavbar()
    initFooter()
    getIndexParameter()
})

const getIndexParameter = () => {
    const now = window.location.href
    const url = new URL(now);
    const page = url.searchParams.get("page");
    switch (page) {
        case 'article':
            openArticle()
            break;
        case 'tutorial':
            openTutorial()
            break;
        case 'event':
            openEvent()
            break;
        default:
            openArticle()
            break;
    }
}

const openArticle = async () => {
    try {
        const get = await fetch('/kompakblogs/pages/article.html')
        const html = await get.text()
        container = document.getElementById('index-container')
        container.innerHTML = html
        renderCard('article')
    } catch (e) {
        console.log(e.message);
    }
}

const openEvent = async () => {
    try {
        const get = await fetch('/kompakblogs/pages/event.html')
        const html = await get.text()
        container = document.getElementById('index-container')
        container.innerHTML = html
        renderCard('event')
    } catch (e) {
        console.log(e.message);
    }
}

const openTutorial = async () => {
    try {
        const get = await fetch('/kompakblogs/pages/tutorial.html')
        const html = await get.text()
        container = document.getElementById('index-container')
        container.innerHTML = html
        renderCard('tutorial')
    } catch (e) {
        console.log(e.message);
    }
}

const renderCard = async (type) => {
    try {
        const get = await fetch(`/kompakblogs/datas/${type}.json`)
        const json = await get.json()
        const data = JSON.parse(JSON.stringify(json))
        const pages = data.pages //this is an aray
        const currentpage = pages[0] //this is an array also
        const container = document.getElementById(`${type}-container`)

        //handle if data is blank        
        if (!currentpage[0] || currentpage[0].length === 0) {
            const blankdata = `<div class="no-content-info">Maaf, belum ada ${type} saat ini</div>`
            container.innerHTML += blankdata
        }
        
        //start make line of columns
        let columncount = 0
        currentpage.forEach(columns => {
            columncount += 1
            const columnId = `${type}-columns-${columncount}`
            const columnhtml = `<div id="${columnId}" class="columns is-tablet"></div>`
            container.innerHTML += columnhtml
            const columnElement = document.getElementById(columnId)

            //start make items
            columns.forEach(item => {
                let itemprev = item.prev
                if(itemprev.length > 124) {
                    const deleteNumber = itemprev.length - 124
                    itemprev = itemprev.slice(0, -(deleteNumber))
                    itemprev += '...'
                }

                //column size adjust
                let devide = 'is-one-quarter'
                if(type === 'event') {
                    devide = 'is-one-third'
                }
                
                const itemhtml =
                    `
                <div class="column ${devide} kk-item-column">
                <div class="card ${type}-card">
                    <a href="${item.path}">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="${item.image}" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <div class="article-title">${item.title}</div>
                            ${itemprev}
                        </div>
                    </div>
                    </a>
                    </div>
                </div>
                `
                columnElement.innerHTML += itemhtml
            })
        });

    } catch (e) {
        console.log(e.message);
    }
}