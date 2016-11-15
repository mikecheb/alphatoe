/**
 * Control's Alphy's expression and chat messages.
 *
 * TODO(mike): Things can still be a little wonky when messages come in rapidly.
 * TODO(mike): The transition between emoji is a little too abrupt.
 * TODO(mike): Rethink the way we loop through animations and queue messages.
 * TODO(mike): On small screens, the chat bubble can still cover the board.
 */
import Personality from './Data/Personality.js';
import * as Utilities from './Utilities.js';

class Alphy {
    constructor(props){
        this.store = props.store;
        this.chatEl = props.chatEl;
        this.alphyEl = props.alphyEl;

        // Subscribe to the store.
        this.store.subscribe("toggleDifficulty", () => {
            if (this.store.hardMode)
                this.emote("hardModeOn");
            else
                this.emote("hardModeOff");
        });
        this.store.subscribe("reset", () => this.emote("reset"));
        this.store.subscribe("move", this.onMove.bind(this));
        this.store.subscribe("complete", this.onGameEnd.bind(this));

        this.nextMessage = null;

        this.chatEl.addEventListener("animationend",
                this.onAnimationEnd.bind(this));
    }

    /**
     * Given a type of event, respond with an emoji and a chat message.
     */
    emote(type){
        const emoji = Utilities.pick(Personality[type].emoji);
        const chat = Utilities.pick(Personality[type].chats);
        this.nextMessage = {
            emoji,
            chat
        }

        // This is slow.
        const opacity = window.getComputedStyle(this.chatEl)["opacity"];

        // HACK(mike): Rethink the whole message loop. This is unreliable; if a
        // second message comes in right after this one, opacity will still be
        // 0 even though we are animating.
        if (opacity >= 0.1 && opacity <= 0.9){
            // We're currently animating, so let onAnimationEnd handle it.
            return;
        }

        if (this.chatEl.classList.contains("visible")){
            // Start hiding the message, allowing onAnimationEnd to handle
            // showing the next one.
            this.hide();
        } else {
            // Show the next message.
            this.showNextMessage();
        }
    }

    /**
     * Resets Alphy to the default state. We could taunt the user, but right now
     * it produces too much message churn.
     */
    onMove(){
        // HACK(mike): Get around the fact that the store fires two messages
        // sequentially when the board is reset.
        if (this.store.board.moveCount === 0 ||
                (this.store.board.moveCount === 1 && this.store.computerFirst))
            return;

        this.emote("default");
    }

    /**
     * Emotes differently depending on who won.
     */
    onGameEnd(){
        if (this.store.board.winner === null)
            this.emote("tie");
        else if (this.store.board.winner)
            this.emote("defeat");
        else
            this.emote("victory");
    }

    onAnimationEnd(e){
        // If a new message was queued while we were showing this one, start
        // hiding.
        if (e.animationName === "fadein" && this.nextMessage)
            this.hide();

        // If we just finished hiding, show the next message.
        if (e.animationName === "fadeout")
            this.showNextMessage();
    }

    /**
     * Displays the queued message, if there is one.
     */
    showNextMessage(){
        if (!this.nextMessage)
            return false;
        this.show(this.nextMessage);
        this.nextMessage = null;
    }

    /**
     * Updates Alphy's expression and message, setting classes properly to
     * animate the chat bubble.
     */
    show(message){
        this.alphyEl.innerText = message.emoji;
        if (message.chat){
            this.chatEl.innerText = message.chat;
            this.chatEl.classList.remove("hidden");
            this.chatEl.classList.add("visible");
        }
    }

    /**
     * Hides the chat bubble.
     */
    hide(){
        this.chatEl.classList.remove("visible");
        this.chatEl.classList.add("hidden");
    }
}

export default Alphy;
