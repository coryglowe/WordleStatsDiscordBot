function isWordleMessage(message: string): boolean  {
    const regex = /^Wordle [0-9]+ [0-6][\/][0-6]\n\n([🟩|⬛|🟨]+[\n]?)+$/;
    return regex.test(message);
}

export default isWordleMessage;
