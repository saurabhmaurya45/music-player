//create full hex
const fullHex = (hex) => {
    let r = hex.slice(1, 2);
    let g = hex.slice(2, 3);
    let b = hex.slice(3, 4);

    r = parseInt(r + r, 16);
    g = parseInt(g + g, 16);
    b = parseInt(b + b, 16);

    return `rgb(${r}, ${g}, ${b})`;
}

//convert hex to rgb
export const hex2rgb = (hex) => {
    if (hex.length === 4) {
        return fullHex(hex);
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
}

export function millisecondsToMinutes(milliseconds) {
    const minutes = milliseconds / 60000;
    return minutes;
}

export function millisecondsToMinutesAndSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Pad seconds with leading zero if necessary
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${paddedSeconds}`;
}
export function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}