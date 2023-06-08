const API_URL = "https://chimeragpt.adventblocks.cc/v1/chat/completions";
const API_KEY = getSessionData("api_key");

const question = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const answer = document.getElementById("text_area");

let controller = null; // Store the AbortController instance

function setSessionData(key, value) {
  document.cookie = `${key}=${value}`;
}

function getSessionData(key) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieKey, cookieValue] = cookies[i].split("=");
    if (cookieKey === key) {
      return cookieValue;
    }
  }
  return null; // Cookie not found
}

document.addEventListener("DOMContentLoaded", function () {
  const api_key_input = document.getElementById("api_key_input");
  const saveBtn = document.getElementById("saveBtn");

  saveBtn.addEventListener("click", function () {
    const api_key = api_key_input.value;
    setSessionData("api_key", api_key);
    console.log("api key stored:", api_key);
  });
});

//const apiKeyParagraph = document.getElementById("api_key_paragraph");
//apiKeyParagraph.textContent = API_KEY;



const generate = async () => {
  console.log(getSessionData("api_key"));

  if (!question.value) {
    alert("Please enter a prompt.");
    return;
  }
  answer.value = "";

  generateBtn.disabled = true;
  stopBtn.disabled = false;
  //sanswer.value = " ";

  // Create a new AbortController instance
  controller = new AbortController();
  const signal = controller.signal;

  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question.value }],
        max_tokens: 100,
        stream: true, // For streaming responses
      }),
      signal, // Pass the signal to the fetch request
    });

    // Read the response as a stream of data
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");


    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      // Massage and parse the chunk of data
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      const parsedLines = lines
        .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
        .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
        .map((line) => JSON.parse(line)); // Parse the JSON string

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        // Update the UI with the new content
        if (content) {
          answer.value += content;
        }
      }
    }
  } catch (error) {
    // Handle fetch request errors
    if (signal.aborted) {
      answer.value = "Request aborted.";
    } else {
      console.error("Error:", error);
      answer.value = "Error occurred while generating.";
    }
  } finally {
    // Enable the generate button and disable the stop button
    generateBtn.disabled = false;
    stopBtn.disabled = true;
    controller = null; // Reset the AbortController instance
  }
};

const stop = () => {
  if (controller) {
    controller.abort();
    controller = null;
  }
};

question.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});
generateBtn.addEventListener("click", generate);
stopBtn.addEventListener("click", stop);


