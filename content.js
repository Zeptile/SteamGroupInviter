console.log('[Steam Inviter] Listening...');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('[Steam Inviter] New message received :: ', request);
        if(request && request.payload && request.action === "send_request") {
            updateInjectedScript(request.payload.groupID);
        }
    }
);

function updateInjectedScript(groupID) {
    const script = 
    `
    const friends = GetCheckedAccounts('#search_results>.selectable');
    InviteUserToGroup(null, ${groupID}, friends);
    `
    const scriptEl = document.createElement('script');
    const codeText = document.createTextNode('(function() {' + script + '})();');
    scriptEl.appendChild(codeText);
    (document.body || document.head).appendChild(scriptEl);
    console.log('[Steam Inviter] Injected Script.');
}