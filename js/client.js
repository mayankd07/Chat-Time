const socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const sendButton = document.querySelector('.btn');

var audio = new Audio('/images/ding.mp3');


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}

while(name === ""){
    name = prompt("Enter your name to join")
}
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'left');
    audio.play();
})


socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})


socket.on('left', name =>{
    append(`${name} left the chat`, 'right');
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message.trim()!=''){
    append(`You: ${message}`, 'right');
    socket.emit('send', message.trim());
    messageInput.value = '';
    }
    else{
        messageInput.value = '';
    }
});

sendButton.addEventListener('click', ()=>{
    $(".container").animate({ scrollTop: 20000000 }, "slow");

            console.log("ha")
          
        })
       