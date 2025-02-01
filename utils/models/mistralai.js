const { Mistral } = require("@mistralai/mistralai");
const mistralClient = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

const mistralAIChat = async (
  messages = [{ role: "user", content: "What is the best French cheese?" }]
) => {
  const chatResponse = await mistralClient.chat.complete({
    model: "mistral-tiny",
    messages: [...messages],
  });
  return chatResponse;
};

module.exports = {
  mistralAIChat: mistralAIChat,
};
