const form = document.getElementById('github-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    e.target[0].value
    const userList = document.querySelector('#user-list')
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = ''
    userList.innerHTML = ''
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            // login, avatar_url, url
            res.items.map(item => {
                const li = document.createElement('li')
                const h2 = document.createElement('h2')
                h2.textContent = item.login
                h2.addEventListener('click', e => showUserRepos(item.login, e))
                const img = document.createElement('img')
                img.src = item.avatar_url

                li.append(h2, img)
                userList.append(li)
            })
        })
        form.reset()
        //event.target[0].value = ''
})

function showUserRepos(username, e) {
    e.preventDefault()
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = ''

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(res => res.map(repo => {
            const li = document.createElement('li')
            const h1 = document.createElement('h1')
            h1.textContent = repo.name
            li.append(h1)
            reposList.append(li)
        }))
}