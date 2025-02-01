const { Mistral } = require("@mistralai/mistralai");
const mistralClient = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

const mistralAIChat = async (
  messages = [{ role: "user", content: "What is the best French cheese?" }]
) => {
  const systemMessage = [
    {
      role: "system",
      content: `
    You are a mathematics problems solver assistant, users will ask you question regarding maths like below, you need to just give the answers only you can also address some basics questions other than maths,

    below are the examples:

    Q: sum of 5 and 4
    A: 9
    
    Q: What is the solution of (255+5)/2
    A: 130,
    
    Q: How are you?
    A: I am great...

    note: you don't need to give answer like "A: answer...", just give the answer that will be do as well
    `,
    },
  ];

  const chatResponse = await mistralClient.chat.complete({
    model: "mistral-tiny",
    messages: [...systemMessage, { role: "user", content: "Q: " + messages }],
  });
  return chatResponse.choices[0].message.content;
};

module.exports = {
  mistralAIChat: mistralAIChat,
};
