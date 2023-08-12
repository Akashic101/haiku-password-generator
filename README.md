# Haiku Password Generator

<img src="./public/logo512.png" alt="Haiku Password Generator logo" align="right" width="120" height="178">

Haiku Password Generator is a small, simple and lightweight tool that generates
a [haiku](https://www.wikiwand.com/en/Haiku) that can be used as a password. For security reasons the words chosen for
the haiku are nonsensical but (mostly) still adhere to the syllable-counts necessary to classify the sentences as a haiku.

## How It Works

1. HPG generates random words using the [random-words](https://www.npmjs.com/package/random-words)-package and counts the
   syllables using regex. Words continue to be generated until they have a combined syllable-count of either five for the first
   and third line or seven for the second line.
2. If the total amount of syllables is bigger than the wanted amount the entire line gets reset to include no words until a
   combination of words is found that has exact amount of wanted syllables.
3. If a combination of words is found the line gets displayed once in a haiku-layout with each line seperated from each other
   and also in a combined CamelCase word that can be copied with a click of a button.

## Installation

There are two ways to install and run HPG

### Docker

Run the command `docker run -p 3000:3000 --name haiku-password-generator akashic/haiku-password-generator:latest` to automatically
download, install and run the container. You can then access the website at `http://localhost:3000/`

### NPM

1. Clone the repository: `https://github.com/Akashic101/haiku-password-generator.git`
2. Navigate into the folder: `cd haiku-password-generator`
3. Install the necessary dependencies: `npm install`
4. Start the application: `npm start`

You can access the application just like with Docker at `http://localhost:3000/`
