interface PlainFileMeta {
    isDir: boolean;
    pathname: string;
    time: number;
    size: number;
}

interface PlainDirectoryMeta {
    pathname: string;
    files: PlainFileMetaList;
}

interface FileType {
    suffix: string[];
    type: string;
    icon: string;
}

type PlainFileMetaList = PlainFileMeta[];

interface PlainDirectoryMap {
    [path: string]: PlainDirectoryMeta;
}

type ProviderList = 'upyun' | 'ten';

export type { PlainFileMeta, PlainFileMetaList, PlainDirectoryMeta, PlainDirectoryMap, FileType, ProviderList };
