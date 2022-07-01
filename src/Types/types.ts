export class BoxCount {
    green: number;
    yellow: number;
    black: number;
    unknown: number;

    constructor(green: number | string = 0, yellow: number | string = 0, black: number | string = 0, unknown: number | string = 0) {

        const typeFixer = (color: number | string): number => {
            if (typeof color === "string") {
                let str = parseInt(color);
                if (isNaN(str)) {
                    return 0;
                }
                return str;
            }
            return color; // Else return color
        }

        this.green = typeFixer(green);
        this.yellow = typeFixer(yellow);
        this.black = typeFixer(black);
        this.unknown = typeFixer(unknown);
    }

    total(): number {
        return this.green + this.yellow + this.black;
    }
}


export class DatabaseResponse {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
    constructor(success: boolean, message: string = "", data: any = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    dataExists(): boolean {
        if (this.data === null || this.data === undefined) {
            return false;
        }
        return true;
    }

    dataCount(): number {
        if (this.dataExists()) {
            return 0;
        }

        if (this.data.isArray()) {
            return this.data.length;
        } else {
            return 1; // One result was returned from the database (not an array)
        }
    }

    dataIsArray(): boolean {
        if (this.dataExists()) {
            return false;
        }
        
        return this.data.isArray();
    }
}

export interface UserStats {
    user_id: string;
    average_attempts: number;
    letter_accuracy: number;
    success_rate: number;
    total_played: number;
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

