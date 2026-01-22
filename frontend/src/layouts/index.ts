const BasicLayout = () => import('./basic.vue')

const IFrameView = () =>
  import('@/packages/effects/layouts').then((m) => m.IFrameView)

export { BasicLayout, IFrameView }
