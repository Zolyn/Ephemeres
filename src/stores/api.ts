import { StoreFragment, transformClass } from 'pinia-class-transformer';
import { nanoid } from 'nanoid';
import { ResolvedDirectoryMap, ResolvedDirectoryMeta, ResolvedFileMeta, ResolvedFileMetaList } from '~/types';
import { PlainDirectoryMap } from '~/types/shared';
import { transformBytes, transformTime } from '~/utils';

class State {
    currentPath: string = '/';

    resolvedDirMap: ResolvedDirectoryMap = {};
}

class Api extends StoreFragment<State, Api> {
    get currentFileMetaList(): ResolvedFileMetaList {
        const dirMeta = Reflect.get(this.state.resolvedDirMap, this.state.currentPath) as
            | ResolvedDirectoryMeta
            | undefined;

        if (!dirMeta) {
            return [];
        }

        const dirList = dirMeta.files.filter((fileMeta) => fileMeta.isDir);
        const fileList = dirMeta.files.filter((fileMeta) => !fileMeta.isDir);

        return dirList.concat(fileList);
    }

    resolveDirectoryMap(dirMap: PlainDirectoryMap): void {
        const resolvedEntries = Object.entries(dirMap).map(([key, dirMeta]): [string, ResolvedDirectoryMeta] => {
            const resolvedFiles = dirMeta.files.map((fileMeta): ResolvedFileMeta => {
                return {
                    id: nanoid(),
                    transformedTime: transformTime(fileMeta.time),
                    transformedSize: transformBytes(fileMeta.size),
                    ...fileMeta,
                };
            });

            return [key, { ...dirMeta, files: resolvedFiles }];
        });

        this.state.resolvedDirMap = Object.fromEntries(resolvedEntries);
    }
}

const useApiStore = defineStore('api', transformClass(State, Api));

export default useApiStore;
