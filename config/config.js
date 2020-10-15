export default {
  singular: true,
  cssLoaderOptions:{
    localIdentName:'[local]'
  },
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
          component: './intelligentDesign'
        },
        {
          path: './design',
          component: './intelligentDesign'
        },
        {
          path: './make',
          component: './intelligentPatternMaking'
        },
        {
          path: './trend',
          component: './trendAnalysis'
        },
        {
          component: '403'
        }
      ]
    }
  ],
};
