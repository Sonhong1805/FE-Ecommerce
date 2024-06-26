type TNavLink = {
  name: string;
  href: string;
  children?: {
    name: string;
    href: string;
  }[];
};
