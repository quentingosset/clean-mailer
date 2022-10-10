import axios from 'axios';
import * as dotenv from 'dotenv'
import {Endpoints} from "./Endpoints";
import config from '../../src/config.json';

dotenv.config();
export class Graph {
// TODO
    // UTILISER LA LIB CLIENT POUR POUVOIR FAIRE DE MEILLEUR CALL API QUE D'UTILISER LE GRAPH REST
    async getUser(accessToken: string): Promise<any> {

        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };

        console.log('request made to web API at: ' + new Date().toString());

        try {
            const response = await axios.get(config.graph_endpoint + Endpoints.GET_USER, options);
            return response.data;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

}
