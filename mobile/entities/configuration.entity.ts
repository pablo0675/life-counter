import player from "./player.entity";
import counter from "./counter.entity";

export default interface ConfigurationEntity {
    id: string;
    name: string;
    user_id: string;
    players: player[];
    counters: counter[];
}