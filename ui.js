export default class ChatUI {
  constructor(list) {
    this.list = list;
  }
  renderovanje(data) {
    const vrijemeObjave = dateFns.distanceInWordsToNow(data.kreirano.toDate(), {
      addSuffix: true,
    });
    let html = `
    <li>
    <div class="message"><span>${data.name}&nbsp;</span>${data.mess}</div>
    <div class="time">${vrijemeObjave}</div>
    </li>
    `;

    this.list.innerHTML += html;
  }

  ocisti() {
    this.list.innerHTML = '';
  }
}
