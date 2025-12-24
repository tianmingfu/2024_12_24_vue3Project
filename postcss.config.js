// postcss.config.js

export default {
  plugins: {
    'postcss-pxtorem': {
      // rem 转换配置
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: ['.norem'],
    },
  },
}
