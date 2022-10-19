import {App} from "./App/App";

async function main() {
    try {
        await App.run();
    } catch (error) {
        console.log(error);
    }
}

main();
