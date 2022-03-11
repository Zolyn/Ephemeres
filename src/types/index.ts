import { PlainDirectoryMeta, PlainFileMeta, ProviderList } from '~/types/shared';

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

interface BaseTransitionProps {
    mode?: 'in-out' | 'out-in';
    appear?: boolean;
}

interface CommonTransitionProps extends BaseTransitionProps {
    enterDuration?: number;
    leaveDuration?: number;
}

interface SlideTransitionProps extends CommonTransitionProps {
    offset?: number;
    reverse?: boolean;
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
