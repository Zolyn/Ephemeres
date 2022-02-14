interface BreadCrumbItem {
    id: string;
    text: string;
    disabled: boolean;
    href: string;
}

type BreadCrumbList = BreadCrumbItem[];

export type { BreadCrumbItem, BreadCrumbList };
