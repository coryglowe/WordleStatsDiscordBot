// Takes the matrix and replaces emojis with the color of the character
export function reconstructMatrix(matrix: string): string {
    matrix = matrix.replace(/[\n ]/g, ""); // Remove new line characters or white space characters
    let cleanString = "";
    for (let i = 0; i < matrix.length; i++) {
        let currentCharCode = matrix.charCodeAt(i);
        if (currentCharCode === 55357) {
            let nextCharCode = matrix.charCodeAt(i + 1);

            if (isNaN(nextCharCode)) {
                // console.log("Unknown char code (55357 current) and isNaN");
            }

            switch (nextCharCode) {
                case 57320: 
                    cleanString += "Y"; // Yellow
                    break;

                case 57321:
                    cleanString += "G"; // Green
                    break;

                default:
                    // console.log("Unknown char code (55357 current)");
                    break;
            }
            
        } else if (currentCharCode === 11035 || currentCharCode === 11036) { 
            // 11035 == black box emoji
            // 11036 == white box emoji
            cleanString+= "B"; // Black
        } else {
            // console.log("Unknown char code not 55357 (green/yellow) or 11035 (black): ", currentCharCode);
            continue;
        }
    }

    return cleanString;
}