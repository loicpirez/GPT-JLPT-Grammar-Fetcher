# GPT JLPT Grammar Fetcher

This project is a Node.js application that uses OpenAI's GPT-3.5 to fetch detailed information about Japanese grammar points related to the JLPT exam. It reads grammar points from a file, queries OpenAI for information, and saves the result in a formatted file.

## Features

- Fetch detailed JLPT grammar point explanations, including meaning, usage, and example sentences.
- Saves the output in JSON format for easy reference.
- Utilizes OpenAI's GPT-3.5 for natural language understanding and output generation.

## Prerequisites

Ensure you have the following installed:

- Node.js (version 16.x or later)
- npm or yarn

You also need an OpenAI API key, which can be obtained from the [OpenAI platform](https://beta.openai.com/).

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

2. Install dependencies:

```bash
npm install
```

or if you prefer `yarn`:

```bash
yarn install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:

```bash
OPENAI_API_KEY=your-api-key-here
```

## File Structure

```
/data
  ├── grammar.txt  # Input file containing grammar points to fetch information
  └── result.txt   # Output file where results will be stored
/utils
  ├── utils.ts     # Utility functions like reading files and handling errors
index.ts           # Main application logic
```

### `grammar.txt` Format

This file should contain grammar points and their JLPT level in the following format:

```
<grammar_point>#<jlpt_level>
```

Example:

```
かどうか#3
ならでは#1
```

## Usage

1. Ensure the `grammar.txt` file inside the `data` directory contains the grammar points you want to look up.

2. Run the application:

```bash
npm start
```

or if using `yarn`:

```bash
yarn start
```

This will read the grammar points from `grammar.txt`, query OpenAI for detailed explanations, and save the results to `result.txt`.

## Example Output

The results will be saved in `data/result.txt` in the following format:

```json
JLPT 3 - かどうか: {
  "grammar_point": "かどうか",
  "meaning": "whether or not",
  "usage": "Verb + かどうか, [い]Adjective + かどうか, Noun + かどうか",
  "example_sentence": "彼が来るかどうか分からない。;I don't know if he will come."
}
```

## Error Handling

In case of any errors during execution, error logs will be displayed in the console, and you can adjust error handling in the `utils.ts` file.

## Environment Variables

The project uses the following environment variable:

- `OPENAI_API_KEY`: Your OpenAI API key. Make sure to set it in the `.env` file.