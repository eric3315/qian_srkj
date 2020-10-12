export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      locale: {
        enable: true,
      },
      dynamicImport: {
        webpackChunkName: true,
        level: 3,
      },
    }],
  ],
  hash:true,
  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        { path: './home', component: './Home'},
        { path: './about', component: './AboutUs'},
        { path: './business', component: './Business'},
        { path: './investor', component: './Investor'},
        { path: './corporate', component: './Corporate'},
        { path: './article', component: './Article'},
        { path: './braftEditor', component: './BEditor'},

      ]
    }
  ],
};
