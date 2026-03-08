export const getTiming = (date: Date, zoneId: string) => {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: zoneId,
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

export const formatTiming = (num: number) => {
    return num <= 9 ? `0${num}` : String(num);
};

export const getDuration = (start: Date, end: Date) => {
    const startMs = start.getTime();
    const endMs = end.getTime();

    const durationMs = endMs - startMs;

    const hours = Math.floor(durationMs / 1000 / 60 / 60);
    const minutes = Math.floor(durationMs / 1000 / 60) % 60;

    return (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "min" : "");
};
