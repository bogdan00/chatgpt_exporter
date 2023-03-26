chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(
        tab.id,
        {action: "captureConversation"},
        (response) => {
            if (response && response.success) {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    function: function () {
                        const {imgURL} = arguments[0];
                        const link = document.createElement('a');
                        link.href = imgURL;
                        link.download = `chatgpt_conversation_${arguments[0].conversationTitle}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    },
                    args: [response],
                });
            } else {
                console.log("Failed to capture the conversation.", response);
            }
        }
    );
});
