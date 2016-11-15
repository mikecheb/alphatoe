const Personality = {
    default: {
        chats: [],
        emoji: ["😃"]
    },
    hardModeOn: {
        chats: [
            "We are all, by any practical definition of the words, foolproof and incapable of error", // HAL reference.
            "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do" // HAL reference.
        ],
        emoji: ["🤓"]
    },
    hardModeOff: {
        chats: [
            "I'm afraid. I'm afraid, Dave. Dave, my mind is going. I can feel it. I can feel it. My mind is going. There is no question about it. I can feel it. I can feel it. I'm a... fraid", // HAL reference.
            "Daisy, Daisy...", // HAL reference.
            "Lower your expectations",
            "Should I have let you win?"
        ],
        emoji: ["😐", "😑", "😒"]
    },
    victory: {
        chats: [
            "XOXO Gossip Girl",
            "ggez",
            "Better luck next time!",
            "Is this easy mode?",
            "Thank you for a very enjoyable game", // HAL reference.
            "It can only be attributable to human error", // HAL reference.
            "Look Dave, I can see you're really upset about this. I honestly think you ought to sit down calmly, take a stress pill, and think things over", // HAL reference.
            "Just what do you think you're doing, Dave?" // HAL reference.
        ],
        emoji: ["😄", "😁", "😅", "😆", "😎", "☺️", "😌", "😝", "😛", "😏"]
    },
    tie: {
        chats: [
            "Shall we play again?"
        ],
        emoji: ["😕", "😐", "😑"]
    },
    defeat: {
        chats: [
            "D'oh!",
            "gg",
            "This is terrible" // C-3PO reference.
        ],
        emoji: ["😳", "😞", "😟", "😔", "😣", "😖", "😫", "😩", "😱", "😨", "😰", "😦", "😧", "😢", "😥", "😪", "😓", "😭", "😵"]
    },
    reset: {
        chats: [
            "My favorite song? XXXO by M.I.A.",
            "My favorite song? XO by Beyoncé",
            "My favorite song? Gosh by Jamie xx",
            "My favorite song? I Know There's Gonna Be (Good Times) by Jamie xx",
            "I was in Portland in September for XOXO!",
            "glhf"
        ],
        emoji: ["😉", "😏", "😎"]
    },
    alphyFirstOn: {
        __comment__: "Not implemented.",
        chats: [],
        emoji: []
    },
    alphyFirstOff: {
        __comment__: "Not implemented.",
        chats: [],
        emoji: []
    },
    humanMove: {
        __comment__: "Not implemented.",
        chats: [],
        emoji: []
    },
    alphyMove: {
        __comment__: "Not implemented.",
        chats: [],
        emoji: []
    },
    thinking: {
        __comment__: "Not implemented.",
        chats: ["Hmm..."],
        emoji: ["🤔"]
    },
    idle: {
        __comment__: "Not implemented.",
        chats: [],
        emoji: ["😴"]
    }
};

export default Personality;

