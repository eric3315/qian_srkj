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
          component: './intelligentDesign/researchList'
        },
        {
          path: './design',
          component: './intelligentDesign/researchList'
        },
        {
          path: './follow',
          component: './intelligentDesign/researchFollow'
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
