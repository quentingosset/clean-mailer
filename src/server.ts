import {Server} from "./Server/Server";

async function main() {
    try {
        await Server.run();
    } catch (error) {
        console.log(error);
    }
}

main();
