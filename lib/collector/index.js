const { sumAccumulate } = require('./sum_accumulate');

/*
 * Persist operational data for machine reading
 * sets the latest guage values
 * sums the latest accumulative values
 */
class Collector {
    constructor() {
        this.stats = {
            requests: {},
            responseTimes: {},
            sockets: {},
            osload: [],
            osmem: {},
            psmem: {},
            concurrents: {}
        };
    }

    collect(opsData) {
        const { osload, osmem, osup, psup, psmem, psdelay, host } = opsData;

        // guage values
        this.stats.osload = osload;
        this.stats.osmem = osmem;
        this.stats.osup = osup;
        this.stats.psup = psup;
        this.stats.psmem = psmem;
        this.stats.psdelay = psdelay;
        this.stats.host = host;

        // accumulative counters
        this.stats.responseTimes = sumAccumulate('responseTimes', this.stats, opsData);
        this.stats.requests = sumAccumulate('requests', this.stats, opsData);
        this.stats.sockets = sumAccumulate('sockets', this.stats, opsData);
        this.stats.concurrents = sumAccumulate('concurrents', this.stats, opsData);
    }

    getStats() {
        return this.stats;
    }
}

module.exports = Collector;
