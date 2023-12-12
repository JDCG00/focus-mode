const getStatus = () => {
	return new Promise((resolve) => {
		chrome.storage.local.get(["status"], (result) => {
			resolve(result.status);
		});
	});
};

chrome.runtime.onInstalled.addListener(async () => {
	chrome.storage.local.set({ status: "OFF" });
	chrome.action.setBadgeText({
		text: await getStatus(),
	});
});

chrome.tabs.onActivated.addListener(async (tab) => {
	const status = await getStatus();

	console.log("cambiando pestaña...", status);
	console.log("tab status: ", tab);
	switch (status) {
		case "ON":
			console.log("ON page loaded");
			await chrome.scripting.executeScript({
				files: ["on.js"],
				target: { tabId: tab.tabId },
			});
			break;
		case "OFF":
			console.log("OFF page loaded");

			await chrome.scripting.executeScript({
				files: ["off.js"],
				target: { tabId: tab.tabId },
			});

			break;

		default:
			break;
	}
});

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
	// We retrieve the action badge to check if the extension is 'ON' or 'OFF'
	console.log("status: ", await getStatus());
	// Next state will always be the opposite
	const nextState = (await getStatus()) === "OFF" ? "ON" : "OFF";
	console.log("nextState: ", nextState);

	chrome.storage.local.set({ status: nextState });
	// Set the action badge to the next state
	await chrome.action.setBadgeText({
		text: await getStatus(),
	});

	switch (await getStatus()) {
		case "ON":
			console.log("ON page clicked");
			await chrome.scripting.executeScript({
				files: ["on.js"],
				target: { tabId: tab.id },
			});
			break;
		case "OFF":
			console.log("OFF page clicked");
			await chrome.scripting.executeScript({
				files: ["off.js"],
				target: { tabId: tab.id },
			});

			break;

		default:
			break;
	}
});
