# Flow

* Player creates a new game
* Player(s) join the game
    * Player instance(s) added to entities array
* Game starts (when room is full or a player starts)
    * Bounds generated
    * Fruit instance added to entities array
    * Tick
        * Bodies array cleared of dynamic bodies
        * Entities array cleared of dead entities
        * Entities updated
        * Check for collisions
* Game ends
