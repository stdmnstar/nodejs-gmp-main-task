import { performance } from 'perf_hooks';
import { logger } from '../logger/logger';


export const trackTime = (_target: unknown, _propertyName: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line func-names
    descriptor.value = async function (...args: unknown[]) {
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        logger.info(` Time to execute method ${originalMethod.name}: ${end - start} ms`);
        return result;
    };
};
