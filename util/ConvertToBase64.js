import * as fs from "fs";

export const convertToBase64 = (files) => {
    let base64Files = [];
    console.log(files);
    files.forEach(file => {
        const img = fs.readFileSync(file.path);
        base64Files.push("data:image/png;base64," + Buffer.from(img).toString('base64'));
    });
    return base64Files;
}

