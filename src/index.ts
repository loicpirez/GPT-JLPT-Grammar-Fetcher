import dotenv from 'dotenv';
import { handleError, readFileAsArray, requireEnvVars, saveResultToFile } from './utils';
import { OpenAI } from 'openai';

dotenv.config();

class ChatGPT {
  apiKey: string;
  client: OpenAI;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = new OpenAI({
      apiKey: apiKey,

    });
  }

  async getGrammarInfo(grammarPoint: string, jlptLevel: number) {
    const prompt = `Please provide detailed information about the Japanese JLPT N${jlptLevel} grammar point '${grammarPoint}' in the following JSON format:
    {
      "grammar_point": "${grammarPoint}",
      "meaning": "<meaning>",
      "usage": "<structure or usage patterns like 'Verb + か + あるいは', '[い]Adjective + か + あるいは', etc.>",
      "example_sentence": "<an example sentence using the grammar point in context, with Japanese and english translation, separated by semicolon. Like (天気はいい。;The weather is good.)>"
    }
    
    Make sure the "usage" field contains specific usage patterns such as how the grammar point connects to verbs, adjectives, and nouns.
    `;

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },

        ],
      });
      const reply = response.choices[0].message.content;
      return reply;
    } catch (error) {
      handleError(error, 'Error fetching grammar information');
    }
  }
}

const main = async () => {
  try {
    const grammarInput = await readFileAsArray('./data/grammar.txt');

    const requiredEnvVars = ['OPENAI_API_KEY'];
    requireEnvVars(requiredEnvVars);
    const chatGPT = new ChatGPT(process.env.OPENAI_API_KEY || '');

    for (const grammarPoint of grammarInput) {
      let grammar = grammarPoint.split('#')[0];
      let jlptLevel = parseInt(grammarPoint.split('#')[1]);
      const result = await chatGPT.getGrammarInfo(grammar, jlptLevel);
      saveResultToFile('./data/result.txt', `JLPT ${jlptLevel} - ${grammar}: ${JSON.stringify(result)}`);
    }
  } catch (error) {
    handleError(error, 'Error in main function:');
  }
};
main();
