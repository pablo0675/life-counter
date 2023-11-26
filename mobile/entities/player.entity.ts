import color from "./color.entity";

export default interface player {
    id: string;
    name: string;
    color: color;
    picture: string | null;
}