const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const tempClient ={
nome:"ana",
email:"jeanstella05@gmail.com",
celular:"11954689903",
cidade:"Belo Horizonte"

}
const getLocalStorage=()=>JSON.parse(localStorage.getItem("db_clien")) ?? [];
const setLocalstorage=(dbClient)=>localStorage.setItem("db_clien",JSON.stringify(dbClient));

const deleteClient=(index)=>{
    dbClient=readClient();
    dbClient.splice(index,1);
    setLocalstorage(dbClient);
}

const updateClient=(index,client)=>{
    const dbClient=readClient();
    dbClient[index]=client;
    setLocalstorage(dbClient);

}

const readClient=()=>getLocalStorage();

const createClient=(client)=>{
    const dbClient=getLocalStorage();
    dbClient.push (client);
    setLocalstorage(dbClient);
}

const clearFields=()=>{
    const fields=document.querySelectorAll(".modal-field");
    fields.forEach(field =>field.value="");

}

const isValidFilds=()=>{
    return document.getElementById("form").reportValidity();
}

const salvarClient=()=>{
    if(isValidFilds()){
        const client ={
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            celular: document.getElementById("celular").value,
            cidade: document.getElementById("cidade").value
        }
        createClient(client);
        updateTable();
        closeModal();

    }
}

const createRow=(client,index)=>{
    const newRow=document.createElement("tr");
    newRow.innerHTML=`
            <td>${client.nome}</td>
            <td>${client.email}</td>
            <td>${client.celular}</td>
            <td>${client.cidade}</td>
            <td>
                <button type="button" class="button green" id="edit-${index}">editar</button>
                <button type="button" class="button red" id="delete-${index}">excluir</button>
            </td>`
    
    document.querySelector("#tableClient>tbody").appendChild(newRow);
}

const clearTable=()=>{
    const rows=document.querySelectorAll("#tableClient>tbody tr");
    rows.forEach(row=>row.parentNode.removeChild(row));
}

const updateTable=()=>{
    const dbClient=readClient();
    clearTable();
    dbClient.forEach(createRow);

}
const fillFields=(client)=>{
    document.getElementById("nome").value=client.nome;
    document.getElementById("email").value=client.email;
    document.getElementById("celular").value=client.celular;
    document.getElementById("cidade").value=client.cidade;
}

const editClient=(index)=>{
    const client=readClient()[index];
    fillFields(client);
    openModal();


}

const editDelet=(event)=>{
    if(event.target.type=="button"){
        const [action,index]=event.target.id.split("-");

        if(action == "edit"){
           editClient(index);
        }else{
            console.log("deletando o cliente");
        }
    }

}


updateTable();

document.getElementById("cadastrarCliente").addEventListener("click",openModal);
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("salvar").addEventListener("click",salvarClient);
document.querySelector("#tableClient>tbody").addEventListener("click",editDelet);
