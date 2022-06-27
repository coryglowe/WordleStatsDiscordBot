// discord.js imports
import { User } from "discord.js";
import getUserData from "../Database/GetUserData";

// Database imports
import insertUser from "../Database/InsertUser";
import { DatabaseResponse } from "../Types/types";

async function registerUser(user: User): Promise<string> {
    let userID: string = user.id;

    let readResponse: DatabaseResponse = await getUserData(userID);

    if (readResponse.success === true) {
        return "You are already registered";
    }

    let createResponse: DatabaseResponse = await insertUser(userID, 0);

    if (createResponse.success === false) {
        return "Could not register";
    }

    return "You are now registered!";
}

export default registerUser;
