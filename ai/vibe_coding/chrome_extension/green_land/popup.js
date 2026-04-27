const changeColorButton = document.getElementById("changeColorButton");
const statusText = document.getElementById("statusText");

async function setPageBackgroundToGreen() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab?.id) {
      statusText.textContent = "未找到可操作的页面。";
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.style.backgroundColor = "green";
      }
    });

    statusText.textContent = "当前页面背景已改为绿色。";
  } catch (error) {
    statusText.textContent = "该页面暂不支持修改背景色。";
    console.error("Failed to change background color:", error);
  }
}

changeColorButton.addEventListener("click", setPageBackgroundToGreen);
