let myLeads = []

let inputEl = document.getElementById("input_el")
const ulEl = document.getElementById("ul_el")
const saveBtn = document.getElementById("save_btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleteLeads = document.getElementById("delete_btn")
const tabBtn = document.getElementById("tab_btn")

deleteLeads.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads= []
    renderLeads()
}
)

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `<li><a target= '_blank' href= '${myLeads[i]}'>`+ myLeads[i]+ "</a></li>"
    }
    ulEl.innerHTML = listItems    
}
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
       
    });
})
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}
saveBtn.addEventListener("click", function() {
    if (inputEl.value !== "") {
        myLeads.push(`https://google.com/search?q=${inputEl.value}`)
        renderLeads()
    }
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})