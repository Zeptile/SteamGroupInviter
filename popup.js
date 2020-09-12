const inputEl = document.querySelector('#steam-group-input');
const btnEl = document.querySelector('#send');

let steamGroupUrl;

inputEl.addEventListener('keyup', (event) => {
    if (event && event.target) {
        steamGroupUrl = event.target.value;
    }
});

btnEl.addEventListener('click', () => {
    if (steamGroupUrl) {
        fetch(`${steamGroupUrl}/memberslistxml/?xml=1`)
        .then(res => res.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {
                    "action": "send_request",
                    "payload": {
                        "groupID": xmlDoc.querySelector('groupID64').childNodes[0].nodeValue
                    }
                });
            });

        });
    }
});