import { background_music, music_checkbox } from "./app.mjs";

export const ControlMusic = () => {
    if (music_checkbox.checked)
        background_music.muted = false;
    else
        background_music.muted = true;
}