const names = [
    "Dafne", "Danelle", "Daniela", "Dianna", "Deliah",
    "Daniel", "David", "Damien", "Dante", "Diego"
];

export const getRandomName = () => {
    let index = Math.floor(Math.random()*names.length);
    return "Default " + names[index];
}

