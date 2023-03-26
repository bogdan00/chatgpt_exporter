chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureConversation") {
        const chatArea = document.querySelector(".items-center"); // Replace '.chat-selector' with the appropriate selector for the conversation area.
        if (chatArea) {
            const container = document.querySelector(".pr-14");
            let conversationTitle = ""
            if (container) {
                conversationTitle = container.text
                console.log('conversation title: ', conversationTitle)
            } else {
                console.log('no conversation title')
            }
            html2canvas(chatArea)
                .then((canvas) => {
                    const imgURL = canvas.toDataURL("image/png");
                    sendResponse({success: true, imgURL, conversationTitle});
                })
                .catch((error) => {
                    console.error("Error capturing canvas:", error);
                    sendResponse({success: false});
                });
        } else {
            console.log("Chat area not found");
            sendResponse({success: false});
        }
        return true;
    } else {
        console.log("Unk request:", request)
        sendResponse({success: false});
    }
});
