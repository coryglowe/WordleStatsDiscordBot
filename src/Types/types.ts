export class BoxCount {
    green: number;
    yellow: number;
    black: number;
    unknown: number;

    constructor(green: number = 0, yellow: number = 0, black: number = 0, unknown: number = 0) {
        this.green = green;
        this.yellow = yellow;
        this.black = black;
        this.unknown = unknown;
    }
}


export class DatabaseResponse {
    success: boolean;
    message: string;
    data: any;
    constructor(success: boolean, message: string = "", data: any = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}


export interface users_tbl {
    user_id?: string;
    streak?: number;
}


export interface played_tbl {
    user_id?: string;
    game_id?: string;
    attempts?: string;
    green_count?: number;
    black_count?: number;
    yellow_count?: number;
}


export interface game_tbl {
    game_id?: number;
    word?: string;
}

