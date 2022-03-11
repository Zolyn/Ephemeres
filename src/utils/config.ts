import { ProviderList } from '~/types/shared';
import { EphemeresConfig } from '~/types';

function getRequestUrl(config: EphemeresConfig): string {
    const providers = Object.keys(config.providerUrls) as ProviderList[];
    const { defaultProvider, backend } = config;

    if (!backend) {
        throw new Error(`[Ephemeres] Error when parsing config: Missing required field 'backend'`);
    }

    if (providers.length) {
        if (defaultProvider) {
            return `${backend}/${defaultProvider}`;
        }

        return `${backend}/${providers[0]}`;
    }

    throw new Error(`[Ephemeres] Error when parsing config: Missing required field 'providerUrls'`);
}

export { getRequestUrl };
