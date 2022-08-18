//MODEL DATA

const contactsData = [  //Cria uma variável que funciona como uma lista de contatos a serem consultados inicialmente
    {
        fname: "Anbu",
        lname: "Arasan",
        phone: "190-309-6101",
        email: "anbu.arasan@email.com",
    },
    {
        fname: "Arivu",
        lname: "Mugilan",
        phone: "490-701-7102",
        email: "arivu.mugilan@email.com",
    },
    {
        fname: "Bob",
        lname: "Johnson",
        phone: "574-909-3948",
        email: "bob.johnson@email.com",
    },
    {
        fname: "Raja",
        lname: "Tamil",
        phone: "090-909-0101",
        email: "raja.tamil@email.com",
    },
    {
        fname: "Sundar",
        lname: "Kannan",
        phone: "090-909-0101",
        email: "sundar.kannan@email.com",
    },
];

//CONTROLLER DATA

class AddressBookCtrl {  //utiliza esse método para criar e inicializar objetos
    constructor(addressBookView) {
        this.addressBookView = addressBookView;
    }

    init() {                                    //inicia o método
        this.addressBookView.init();
    }

    getContacts() {                     //usada para acessar a propriedade de um objeto, no caso a array de objetos
        return contactsData;
    }

    getContact(index) {                 //usada para acessar o índice de um objeto, no caso a array de objetos
        return contactsData[index];
    }

    addContact(contact) {                  //usada para adicionar contatos na array
        contactsData.push(contact);
    }
    removeContact(index) {                 //usada para remover contatos da array
        contactsData.splice(index, 1);
    }


}

//VIEW DATA 

class AddressBookView {             //essa é a área do código responsável pela visualização e renderização do "address book"
    init() {
        this.renderContactListModule();
        this.renderContactDetailsModule(0);
        this.addContactModule();
    }

    //ADICIONAR

    addContactModule() {                       //módulo que vai ser responsável por adicionar os contatos
        const $addContact = document.getElementById('add-contact-btn');
        $addContact.addEventListener("click", this.addContactBtnClicked.bind(this));
    }

    addContactBtnClicked() { //módulo que vai ser responsável por adicionar os contatos quando o botão for clicado

        
        const $addContactInputs = document.getElementsByClassName('add-contact-input'); //aqui vão os inputs dos formulários do "add contact"

        
        let newContact = {}; //vai "abrigar" os novos contatos

        
        for (let i = 0, len = $addContactInputs.length; i < len; i++) { //percorre o array para pegar os dados

            let key = $addContactInputs[i].getAttribute('data-key');
            let value = $addContactInputs[i].value;
            newContact[key] = value;
        }

        
        addressBookApp.addContact(newContact); //acrescenta novos objetos no método addContact

        
        this.renderContactListModule(); //renderiza a lista de contatos com os novos dados

    }

    //EDITAR

    editContactBtnClicked(e) {

        
        document.getElementById('edit-contact-module').style.display = "block"; //vai mostrar o botão de editar

        // model
        let selectedIndex = null;

        if (typeof e === 'object') { //Esse eu não entendi muito bem. Recebe um atributo se o tipo de 'e' for um objeto? 
            e.stopPropagation();
            selectedIndex = e.target.getAttribute('data-index');
        } else {
            selectedIndex = e;
        }

        this.showContactDataOnEditFormInputs(selectedIndex); //Vai exibir os dados salvos no contato quando o botão edit for clicado

        // save the edited contact
        const $saveContactBtn = document.getElementById('edit-contact-btn');
        $saveContactBtn.setAttribute('data-index', selectedIndex);
        $saveContactBtn.addEventListener("click", this.saveEditContactBtnClicked.bind(this));

    }

    showContactDataOnEditFormInputs(selectedIndex) { //mostra os dados de contato no "edit form"

        const $editContactInputs = document.getElementsByClassName('edit-contact-input'); 

        for (let i = 0, len = $editContactInputs.length; i < len; i++) {
            $editContactInputs[i].value = contactsData[selectedIndex][$editContactInputs[i].getAttribute("data-key")];
        }

    }

    saveEditContactBtnClicked(e) { //salva o contato depois de editado

        
        const selectedIndex = e.target.getAttribute('data-index'); //pega o index selecionado

        
        const $editContactInputs = document.getElementsByClassName('edit-contact-input');

       
        const newContact = {}; //cria um objeto vazio que vai guardar o novo contato editado

        
        for (let i = 0, len = $editContactInputs.length; i < len; i++) { //faz um loop através dos inputs para pegar dados e armazenar nos objetos

            let key = $editContactInputs[i].getAttribute('data-key');
            let value = $editContactInputs[i].value;
            newContact[key] = value;

        }

        
        addressBookApp.editContact(selectedIndex, newContact); //passar o index e novo objeto pro controlador

        
        this.renderContactListModule(); //renderiza a lista de contatos

        
        document.getElementById('edit-contact-module').style.display = "none"; //esconde o módulo de contato? não entendi o "none"

    }



removeContact(e) {

    // get the selected index
    let selectedIndex = null; //pega o index selecionado

    if (typeof e === 'object') {
        e.stopPropagation();
        selectedIndex = e.target.getAttribute('data-index')
    } else {
        selectedIndex = e;
    }


    
    addressBookApp.removeContact(selectedIndex); //passa as informações pro módulo de remover contatos

    
    this.renderContactListModule(); //renderiza lista de contatos

}

//RENDERIZAR


    renderContactDetailsModule(e) { //renderiza a lista de contatos
        let selectedIndex = null;


        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = this.getAttribute('data-index')
        } else {
            selectedIndex = e;
        }


const selectedItem = addressBookApp.getContact(selectedIndex); //pega o contato selecionado pelo indice


const $ContactItemUI = document.getElementById('contact-item-details'); //pega elemento pelo seu id


$ContactItemUI.innerHTML = `${selectedItem['fname']} <br> ${selectedItem['lname']} <br> ${selectedItem['phone']} <br> ${selectedItem['email']}`; //parte visual para mostrar todos os dados contidos na array de objetos

this.hightlightCurrentListItem(selectedIndex); //destaca o item que o usuário está com o mouse em cima

}

hightlightCurrentListItem(selectedIndex) {
    const $ContactListItems = document.getElementsByClassName('contact-list-item');

    for (let i = 0, len = $ContactListItems.length; i < len; i++) {
        $ContactListItems[i].classList.remove('active');
    }

    $ContactListItems[selectedIndex].classList.add("active")
}


renderContactListModule() {

    
    const contacts = addressBookApp.getContacts(); //recebe os contatos?

    
    const $ContactListUI = document.getElementById('contact-list') //mostra a lista de contatos de acordo com sua id
    $ContactListUI.innerHTML = '';

    

    
    for (let i = 0, len = contacts.length; i < len; i++) {

      

       
        let $editIcon = document.createElement('small'); //icone do botao editar
        $editIcon.setAttribute('class', 'edit-contact-btn');
        $editIcon.setAttribute('data-index', i);
        $editIcon.innerHTML = '&#9998';
        $editIcon.addEventListener("click", this.editContactBtnClicked.bind(this));

        
        let $removeIcon = document.createElement('small'); //icone do botao remover
        $removeIcon.setAttribute('class', 'remove-contact-btn');
        $removeIcon.setAttribute('data-index', i);
        $removeIcon.innerHTML = '&#9747';
        $removeIcon.addEventListener("click", this.removeContact.bind(this));

        
        let $div = document.createElement('div');
        $div.innerHTML = `${contacts[i]['fname']}, <strong>${contacts[i]['lname']}</strong> `;
        $div.append($removeIcon);
        $div.append($editIcon);

        
        let $li = document.createElement('li');
        $li.setAttribute('class', 'contact-list-item');
        $li.setAttribute('data-index', i);


        $li.append($div);
        $li.addEventListener("click", this.renderContactDetailsModule.bind(this));

        $ContactListUI.append($li);
    }

}

}



const addressBookView = new AddressBookView(); //cria um objeto a partir da classe AddressBookView


const addressBookApp = new AddressBookCtrl(addressBookView); //cria um objeto a partir do AddressBookCtrl. Tem alguma relação tbm com a variável, mas não entendi exatamente o que faz.


addressBookApp.init(); //inicializador do programa