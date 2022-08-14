chrome.action.onClicked.addListener((tab)=> {
    const options = {
    target: { tabId: tab.id },
    files: ["scripts/scrapper.js"]
}

    chrome.scripting.executeScript(options)
})

//inyecta la script, usando objet