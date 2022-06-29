// to run: be in current directory of this script
// type: node index.js

// Script that converts data from XML to JSON because it is easier to paste multiline Wordle message in XML. Then convert back to JSON for simplicity

function parseData(inputfile, outputfile) {
    var convert = require("xml-js");
    var xml = require("fs").readFileSync(`${inputfile}.xml`, "utf-8");

    var options = { ignoreComment: true, alwaysParent: true }

    var result = convert.xml2js(xml, options);

    // console.log(result.elements[0].elements[1].elements[0].elements); // Don't delete, use this for reference for current schema

    let text = result.elements[0].elements[1].elements[0].elements[0].text;

    let textArray = result.elements[0].elements[1].elements;

    let user_id = result.elements[0].elements[0].elements[0].text;

    // console.log(user_id);
    // console.log(text);

    let textFixed = text.replace(/[\s]+/g, " "); // + To capture a group
    textFixed = textFixed.replace(/[ W]/, ""); // Remove the space in the first index

    let items = []; // Array of formatted text strings

    // console.log(textArray[0].elements[0].text);

    for (let i = 0; i < textArray.length; i++) {
        let textFixed = textArray[i].elements[0].text.replace(/[\s]+/g, " "); // + To capture a group
        items.push(textFixed);
    }

    let userData = {
        user_id,
        data: items
    }

    var writer = require("fs").writeFileSync(`${outputfile}.json`, JSON.stringify(userData, null, 2));

    process.exit(0); // Successfully wrote data
}

function main() {
    const readline = require("readline");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // File extention is automatically set, do not input file extension, just name
    rl.question("Enter XML filename: ", (inputfile) => {
        const xmlfile_exists = require("fs").existsSync(`./${inputfile}.xml`);
        if (xmlfile_exists) {
            rl.question("Enter output filename: ", (outputfile) => {
                parseData(inputfile, outputfile);
                process.exit(0);
            });
        } else {
            console.log(`Error: ${filename}.xml does not exist in this directory`);
            process.exit(1);
        }
    });
}

main();
