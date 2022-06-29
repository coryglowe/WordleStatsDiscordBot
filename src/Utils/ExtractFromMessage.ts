export function extractMatrix(message: string): string | undefined {
    const regex = /([🟩|⬛|🟨|⬜]+[\n ]?)+/; // Newline or space are option, in case multiple valid formats are sent
    let regexMatch = message.match(regex);

    if (regexMatch === null) {
        return undefined;
    }

    return regexMatch[0];
}

export function extractAttempts(message: String): number | undefined {
    let regex = /[1-6|X][/]/;
    let regexMatch = message.match(regex);

    if (regexMatch === null) {
        return undefined;
    }

    let attempt = regexMatch[0][0]; 

    if (attempt === undefined) {
        return undefined;
    }

    if (attempt === "X") {
        return 7; 
    }

    if (isNaN(parseInt(attempt))) {
        return undefined
    }

    return parseInt(attempt);
}

export function extractDay(message: string): number | undefined {
    let regex = /[0-9]{3}/;
    let regexMatch = message.match(regex);

    if (regexMatch === null) {
        return undefined;
    }

    if (isNaN(parseInt(regexMatch[0]))) {
        return undefined;
    }

    return parseInt(regexMatch[0]);
}