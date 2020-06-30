export default class ChatRoom {
  constructor(room, name) {
    this.room = room;
    this.name = name;
    this.db = db.collection('chat');
    this.unsub;
  }
  //potrebna nam je asinkrona metoda jer ce se taj chat tribat updateat odnsno zato jer cemo slat "jednom" poruku pa opet "jednom" pa opet...
  async addNewMess(mess) {
    const time = new Date();
    const chat = {
      mess: mess,
      name: this.name,
      room: this.room,
      kreirano: firebase.firestore.Timestamp.fromDate(time),
    };

    //da bi se nesto sacuvalo odnosno dodalo(addalo) triba nam awaitanje asinkrone metode
    //sejvanje(addanje) chat dokumenta
    const response = await this.db.add(chat);
    return response;
  }

  //radimo real-time listener, a on nije asinkrona metoda jer zelimo update svaki put kada se nesto dogodi
  getChats(callback) {
    //where() metodu koristimo da bi u kolekciji u bazi nasli odgovarajuce stanje, vraca true
    //trazimo (zbog instance na ChatRoom klasu) u ovom slucaju ima li koji room da je jednak gejming room-u
    //orderBy() metodu koristimo da bi po nekom stringu rangirali
    this.unsub = this.db
      .where('room', '==', this.room)
      .orderBy('kreirano')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc;
          if (change.type === 'added') {
            //ovdje moramo updateat UI
            callback(doc.data());
          }
        });
      });
  }

  updateName(name) {
    this.name = name;
    localStorage.setItem('ime', name);
  }

  updateRoom(room) {
    this.room = room;
    console.log('soba je apdejtana');
    //unsubamo se da vratimo sve na pocetak kada pritisnemo na sobu koju zelimo
    //provjeravamo je li this.unsub ima neku vrijednost jer smo je u kontruktoru samo deklarirali, ne i inicijalizirali
    if (this.unsub) {
      this.unsub();
    }
  }
}
