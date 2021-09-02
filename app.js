const form = document.querySelector('#SearchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {params: {q: searchTerm}}
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`, config);
    makeImages(res.data) 
    form.elements.query.value = ''
})

const makeImages = (shows) => {
    for(let result of shows) {
        if(result.show.image) { 
            let img = document.createElement('img')
            let link = document.createElement('a')
            let showName = result.show.name
            showName.toLowerCase()
            showName = showName.replace(' ', '-')
            for(let char of showName) {
                if(char === '') {           
                    char.remove();
                }
            }   
            const year = result.show.premiered.slice(0,4)
            img.src = result.show.image.medium
            img.classList.add('img')
            link.href = `https://lake.egybest.life/series/${showName}-${year}/`;
            link.target = '_blank'
            link.append(img)
            document.body.append(link)   
        }
    }
}

// `https://lake.egybest.life/series/${showName}-${year}`

