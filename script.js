"use strict";

//Det globale array som skal bruge til at opholde objekterne fra ordbogen
let globalArrayOfWords = [];

window.addEventListener("load", getData)

async function getData() {
    const response = await fetch("ddo_fullforms_2023-10-11.csv"); // husk rigtigt filnavn
    const rawtext = await response.text();

    globalArrayOfWords = rawtext.split("\n").map(line => {
        const parts = line.split("\t");
        return {
        variant: parts[0],
        headword: parts[1],
        homograph: parts[2],
        partofspeech: parts[3],
        id: parts[4]
        }
    });


//Tjekker længden på arrayet
    console.log(globalArrayOfWords.length)
//Printer de første stykker objekter i arrayet ud for at se hvordan de ser ud
    console.log(globalArrayOfWords.slice(0, 5))

  //Undersøger hvilket index det er at ordet, hestevogn har i arrayet
  const hestevognIndexes = globalArrayOfWords
  .map((entry, index) => entry.variant === "hestevogn" ? index : -1)
  .filter(index => index !== -1); 

  console.log("Index for hestevogn:", hestevognIndexes);

  const hestevognEntries = globalArrayOfWords.filter(entry => entry.variant === "hestevogn");
    console.log(hestevognEntries);

    console.log(binarySearchFunction("hestevogn", globalArrayOfWords, compareValues));
}

function compareValues(search, check) {
    return search.localeCompare(check, "da")
}       


// adjusted binary search.
function binarySearchFunction(value, globalArrayOfWords, compareValues) {
    let start = 0;
    let end = globalArrayOfWords.length - 1;
    let middle = 0;
    let counter = 0;

    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        counter++;

        const compareValue = compareValues(value.toLowerCase(), globalArrayOfWords[middle].variant.toLowerCase());
        console.log(globalArrayOfWords[middle])
        console.log("Start:", start, "End:", end, "Middle:", middle);
        console.log("Compare Value:", compareValue);

        if (compareValue === 0) {
            console.log("Correct");
            console.log(`It took ${counter} attempts to find the result`);
            return middle;
        } else if (compareValue < 0) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
    return "Could not find the value";
}


  