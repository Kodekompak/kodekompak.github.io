const initNavbar = async () => {
    try {
        const get = await fetch('/kompakblogs/components/navbar.html')
        const content = await get.text()
        nav = document.querySelector('nav')
        nav.innerHTML = content
        //setup nav toggle
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }
    } catch (e) {
        console.log(e.message);
    }
}

const initFooter = async () => {
    try {
        const get = await fetch('/kompakblogs/components/footer.html')
        const content = await get.text()
        footer = document.querySelector('footer')
        footer.innerHTML = content
    } catch (e) {
        console.log(e.message);
    }
}

const addDescTag = (description) => {
    const desc = document.createElement('meta');
    desc.setAttribute('name', 'description');
    desc.content = description;
    document.getElementsByTagName('head')[0].appendChild(link);
}