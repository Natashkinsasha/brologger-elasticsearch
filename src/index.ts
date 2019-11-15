import { Transport, TransportOptions } from 'brologger';
import * as elasticsearch from 'elasticsearch';


export interface IESTransportOptions extends TransportOptions {
    indexPrefix: string;
    client: elasticsearch.Client;
}

export default class ElasticSearchTransport extends Transport {
    private readonly client: elasticsearch.Client;

    constructor(private readonly options: IESTransportOptions) {
        super(options);
        this.client = options.client;
    }

    public log(level: string, message?: string, infoObject?: object, meta?: object): Promise<any> {
        return this.bulk(this.client, { severity: level, message, ...infoObject, meta });
    }

    private bulk(client: elasticsearch.Client, data: any) {
        return new Promise((resolve, reject) => {
            return client.bulk(
                {
                    body: [
                        {
                            index: {
                                _index: `${this.options.indexPrefix}-${new Date().toISOString().slice(0, 10)}`,
                                _id: generateId(10),
                            },
                        },
                        { ['@timestamp']: new Date().toISOString(), ...data },
                    ],
                },
                (error: any, response: any) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(response);
                }
            );
        });
    }
}

function generateId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

