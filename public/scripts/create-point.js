/* comentario */

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    /* fetch faz uma promessa que vai e retornara algo
       then => então...
       function(){ ... }
          () => {} - arrow function
          function => res.algo() - uma chamada e um retorno
    */

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for ( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities( event ) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//let é uma variavel que pode mudar de valor
let selectedItems = []

function handleSelectedItem(event){
    
    const itemLi = event.target

    //adicionar(add) ou remover(remove) uma classe como js
    itemLi.classList.toggle("selected")
    

    const itemId = itemLi.dataset.id


    //verificar se existem items selecionados
    //pegar os items
    /*
        const alreadySelected = selectedItems.findIndex( function(item) { 
           const itemFound = item == itemId
           return itemFound
        }) 
    */
    const alreadySelected = selectedItems.findIndex( item => item == itemId )


    //se ja estiver selecionado
    if(alreadySelected >= 0){
        
        //tirar da seleção (retira/filtra quando o retorno é falso)
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    
    } else {
        //se nao estiver, adicionar a seleção
        selectedItems.push(itemId)
    }


    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}