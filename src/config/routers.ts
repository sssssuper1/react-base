interface Routers {
  title: string;
  key: string;
  path: string;
  component: any;
}

const routersConfig: Routers[] = [{
  title: 'home',
  key: 'home',
  path: '/home',
  component: () => import('@/routes/home'),
}, {
  title: 'test',
  key: 'test',
  path: '/test',
  component: () => import('@/routes/test'),
}];

export default routersConfig;
