import { PlainDirectoryMeta, PlainFileMeta, ProviderList } from '~/types/shared';
import { BaseTransitionProps, CommonTransitionProps, SlideTransitionProps } from '~/types/transition';

interface BreadCrumbItem {
    id: string;
    text: string;
    disabled: boolean;
    path: string;
}

type BreadCrumbList = BreadCrumbItem[];

interface ResolvedFileMeta extends PlainFileMeta {
    id: string;
    transformedTime: string;
    transformedSize: string;
}

type ResolvedFileMetaList = ResolvedFileMeta[];

interface ResolvedDirectoryMeta extends PlainDirectoryMeta {
    files: ResolvedFileMetaList;
}

interface ResolvedDirectoryMap {
    [path: string]: ResolvedDirectoryMeta;
}

interface EphemeresConfig {
    backend: string;
    providerUrls: Partial<Record<ProviderList, string>>;
    defaultProvider?: ProviderList;
}

export type {
    BreadCrumbItem,
    BreadCrumbList,
    ResolvedFileMeta,
    ResolvedFileMetaList,
    ResolvedDirectoryMeta,
    ResolvedDirectoryMap,
    EphemeresConfig,
    BaseTransitionProps,
    CommonTransitionProps,
    SlideTransitionProps,
};
