console.log('hello world')

const helloWorldBox = document.getElementById('hello-world')
const PostsBox = document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')


$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response) {
        console.log(response)
        
    },
    error: function(error){
        console.log(error)
    }
})

let visible = 3


const getData = ()=> {
$.ajax({
    type: 'GET',
    url: `/data/${visible}/`,
    success: function(response) {
        console.log(response)
        const data = response.data
        setTimeout(()=>{
            spinnerBox.classList.add('not-visible')
            console.log(data)
            data.forEach(element => {
                PostsBox.innerHTML += 
                `<div class="card mb-2">
                    <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.body}</p>
                    </div>
                    <div class="card-footer">
                    <div class="row">
                        <div class="col-2">
                        <a href="#" class="btn btn-primary">Details</a>
                        </div>
                        <div class="col-2">
                        <a href="#" class="btn btn-primary">Like</a>
                        </div>
                    </div>
                    </div>
                </div>`
            });
        },1000)
        console.log(response.size)
        if(response.size === 0)
        {
            endBox.textContent = 'No posts added yet...'
        }
        else if(response.size <=visible)
        {
            loadBtn.classList.add('not-visible')
            endBox.textContent = 'No more post to Load...'

        }

    },
    error: function(error){
        console.log(error)
    }
}) 
}

loadBtn.addEventListener('click', ()=>{
    spinnerBox.classList.remove('not-visible')
    visible += 3
    getData()
})

getData()
