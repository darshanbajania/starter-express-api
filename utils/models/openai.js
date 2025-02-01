const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const openAIChat = async () => {
  const promptText = `You answer mathematics problems like below:
    
    Q: sum of 5 and 4
    A:9
    
    Q: What is the solution of (255+5)/2
    A:130
    
    Q: ${queryText}
    A:`;
  const response = await openai.createCompletion({
    model: "gpt-4o-mini",
    prompt: promptText,
    temperature: 0,
    max_tokens: 7,
  });

  return response;
};

module.exports = {
  openAIChat: openAIChat,
};
