/* eslint-disable no-unused-vars */
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EPH_REPORT: string;
            EPH_TARGET: string;
        }
    }
}

const isReport = process.env.EPH_REPORT;
const isClient = process.env.EPH_TARGET ? process.env.EPH_TARGET.includes('client') : null;
const isStatic = process.env.EPH_TARGET ? process.env.EPH_TARGET.includes('static') : false;

export { isReport, isClient, isStatic };
