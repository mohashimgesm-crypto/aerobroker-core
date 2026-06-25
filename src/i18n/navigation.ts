import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// مكوّنات تنقّل واعية باللغة (Link، useRouter، redirect ...)
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
