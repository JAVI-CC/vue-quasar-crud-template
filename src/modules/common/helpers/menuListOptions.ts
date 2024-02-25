interface MenuListOptions {
  label: string;
  icon: string;
  routerName: string;
}

const menuListOptions: MenuListOptions[] = [
  {
    label: 'User List',
    icon: 'mdi-account-multiple',
    routerName: 'user-list',
  },
  {
    label: 'Logout',
    icon: 'mdi-logout',
    routerName: 'acceder',
  },
];

export default menuListOptions;
