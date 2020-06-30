import ChatRoom from './chat.js';
import ChatUI from './ui.js';

//dom manipulacija
const lista = document.querySelector('ul');
const formaChat = document.querySelector('.form-chat');
const formaName = document.querySelector('.form-name');
const updateIme = document.querySelector('.update-name');
const sobe = document.querySelector('.buttons');

//class instance
//stavili smo argument general da nam to bude pocetna soba kad otvorimo aplikaciju
const chatroom = new ChatRoom('general', localStorage.getItem('ime'));
const chatUI = new ChatUI(lista);

//event listener za poruku
formaChat.addEventListener('submit', (e) => {
  e.preventDefault();

  let inputMess = formaChat.mess.value.trim();
  chatroom
    .addNewMess(inputMess)
    .then(() => {
      formaChat.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

//event listener za promjenu imena
formaName.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputPerson = formaName.name.value.trim();
  chatroom.updateName(inputPerson);
  formaName.reset();

  updateIme.innerHTML = `Tvoje ime je obnovljeno u ${inputPerson}`;

  setTimeout(() => {
    updateIme.innerHTML = '';
  }, 3000);
});

//event listener za sobe
sobe.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.ocisti();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats((chat) => {
      chatUI.renderovanje(chat);
    });
  }
});

if (localStorage.getItem('ime')) {
  localStorage.setItem('ime', localStorage.inputPerson);
} else {
  localStorage.setItem('ime', 'anonimac:');
}

chatroom.getChats((data) => {
  chatUI.renderovanje(data);
});

/*setTimeout(() => {
  chatroom.updateRoom('sport');
  chatroom.updateName('mate');
  chatroom.getChats((data) => {
    console.log(data);
  });
  chatroom.addNewMess('hej hej');
}, 3000);*/
