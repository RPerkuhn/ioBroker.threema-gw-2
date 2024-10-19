"use strict";

const utils = require("@iobroker/adapter-core");
const axios = require("axios");

const myThreemaURL = "https://msgapi.threema.ch";

class ThreemaGw extends utils.Adapter {
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: "threema-gw",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        //this.log.debug("Adapter onReady was triggered");

        const result = await this.getThreemaCredits();

        let connected = false;
        if (result >= 0) {
            connected = true;
        } else {
            connected = false;
        }

        this.setState("info.connection", { val: connected, ack: true });
    }

    onUnload(callback) {
        try {
            //this.log.debug("Adapter onUnload was triggered");
            this.setState("info.connection", { val: false, ack: true });
            this.setState("info.credits", { val: -999, ack: true });
            this.setState("info.lastresponse", { val: "adapter is not running", ack: true });
            callback();
        } catch (e) {
            callback();
        }
    }

    async onMessage(obj) {
        //this.log.debug("Adapter Message was triggered");
        if (typeof obj === "object" && obj.message) {
            if (obj.command === "send") {
                const message = obj.message;
                //this.log.debug("Send message '" + message + "'");
                const result1 = await this.getThreemaCredits();
                if (result1 === 200) {
                    //run only if everything is fine with Threema-GW
                    const result2 = await this.sendSimpleThreemaMessage(message);
                    if (result2 !== 200) {
                        this.log.error("API responded " + result2);
                    }
                    this.getThreemaCredits();
                }
                // Send response in callback if required
                if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
            }
        }
    }

    async getThreemaCredits() {
        try {
            const webCommand = myThreemaURL + "/credits?from=" + this.config.from + "&secret=" + this.config.apisecret;
            // this.log.debug(webCommand);
            const response = await axios.get(webCommand);
            //this.log.debug(parseInt(response.data));
            const status = parseInt(response.status);
            //this.log.debug("Response from API is " + status);
            switch (status) {
                case 200:
                    //responseFromAPI = '200 - connection successful';
                    const credits = parseInt(response.data);
                    //this.log.debug("Threema Credits left " + credits);
                    this.setState("info.credits", { val: credits, ack: true });
                    this.setState("info.lastresponse", { val: "200 - connection successful", ack: true });
                    this.setState("info.connection", { val: true, ack: true });
                    break;
                case 401:
                    //responseFromAPI = '401 - API identity or secret are incorrect';
                    this.setState("info.credits", { val: -999, ack: true });
                    this.setState("info.lastresponse", {
                        val: "401 - API identity or secret are incorrect",
                        ack: true,
                    });
                    this.setState("info.connection", { val: true, ack: true });
                    break;
                case 402:
                    //responseFromAPI = '402 - no credits remain';
                    this.setState("info.credits", { val: -999, ack: true });
                    this.setState("info.lastresponse", { val: "402 - no credits remain", ack: true });
                    this.setState("info.connection", { val: true, ack: true });
                    break;
                case 404:
                    //responseFromAPI = '404 - using phone or email as the recipient specifier, and the corresponding recipient could not be found';
                    this.setState("info.credits", { val: -999, ack: true });
                    this.setState("info.lastresponse", {
                        val: "404 - using phone or email as the recipient specifier, and the corresponding recipient could not be found",
                        ack: true,
                    });
                    this.setState("info.connection", { val: true, ack: true });
                    break;
                case 413:
                    //responseFromAPI = '413 - the message is too long';
                    this.setState("info.credits", { val: -999, ack: true });
                    this.setState("info.lastresponse", { val: "413 - the message is too long", ack: true });
                    this.setState("info.connection", { val: true, ack: true });
                    break;
                case 500:
                    //responseFromAPI = '500 - a temporary internal server error occurs';
                    this.setState("info.credits", { val: -999, ack: true });
                    this.setState("info.lastresponse", {
                        val: "500 - a temporary internal server error occurs",
                        ack: true,
                    });
                    this.setState("info.connection", { val: true, ack: true });
                    break;
                default:
                    //responseFromAPI = '000 - undefined';

                    return -999;
            }
            return status;
        } catch (error) {
            this.log.error(error);
            return -999;
        }
    }

    async sendSimpleThreemaMessage(messageText) {
        //Nachricht versenden
        try {
            const result = await axios({
                method: "post",
                url: myThreemaURL + "/send_simple",
                data: {
                    from: this.config.from,
                    secret: this.config.apisecret,
                    to: this.config.to,
                    text: messageText,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            //this.log.debug("Resonse from API " + result.status);
            return result.status;
        } catch (error) {
            this.log.error(error);
            return -999;
        }
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new ThreemaGw(options);
} else {
    // otherwise start the instance directly
    new ThreemaGw();
}
