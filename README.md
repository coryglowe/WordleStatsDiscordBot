# Wordle stats tracker discord bot

When a user shares their daily Wordle, the bot will save the information.

Users can also show off their stats using a command and view leaderboards (Work in progress)

Required Permissions ID: 346176

(TypeScript, Node.js, MySQL)

## Database
Table generated from <a href="dbdiagram.io">dbdiagram.io</a>

```sql
Table user as u {
  user_id string [pk, increment]
  streak int
}

Table game as g {
  game_id int [pk]
  word varchar
}

// Junction table
Table played as p {
  user_id string [ref: > u.user_id]
  game_id int [ref: > g.game_id]
  attempts int
  green_count int
  yellow_count int
  black_count int
}
```

![Database image](/Assets/db.png)


## Images & videos
![img1](/Assets/sc2.png)

https://user-images.githubusercontent.com/73256760/176044911-1ec75be4-2f13-4294-ab04-ee02a2f15e83.mov

