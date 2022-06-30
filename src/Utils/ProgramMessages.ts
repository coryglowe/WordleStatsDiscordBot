export const ProgramErrors = {
    DatabaseConnection: "Error: Could not establish connection to database",
    DatabaseQuery: "Error: MySQL query failed",
    InvalidWordleBoard: "Error: Wordle Board is invalid",
    InvalidDay: "Error: Wordle day is invalid"
} as const;

export const ProgramMessages = {
    NoResultsFound: "No results found",
    ResultsFound: "Results found!",
    ResourceCreated_Success: "Successfully created new resource!",
    ResourceCreated_Failed: "Resource could not be created"
} as const;
