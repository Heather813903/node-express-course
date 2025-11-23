const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
    try {
        await writeFile("temp.txt", "This is line 1\n");
        await writeFile("temp.txt", "This is line 2\n", { flag: "a" });
        await writeFile("temp.txt", "This is line 3\n", { flag: "a" });

        console.log("Finished writing to temp.txt");
    } catch (err) {
        console.log("An error occurred:" , err);
    }
};


const reader = async () => {
    try {
        const data = await readFile("temp.txt", "utf8");
        console.log("Contents of temp.txt:");
        console.log(data);
    } catch (err) {
        console.log("An error occurred while reading:", err);
    }
};

const readWrite = async () => {
    try {
        await writer();
        await reader();
    } catch (err) {
        console.log("An error occurred in readWrite:", err);
    }
};

readWrite();
