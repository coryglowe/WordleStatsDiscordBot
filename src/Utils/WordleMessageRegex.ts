function isWordleMessage(message: string): boolean  {
    const regex = /^Wordle [0-9]+ [1-6|X][\/][6]\n\n([🟩|⬛|🟨]+[\n]?)+$/;
    return regex.test(message);
}

export default isWordleMessage;
