const BasicLayout = () => import('./basic.vue')

const IFrameView = () =>
  import('@/layouts/components').then((m) => m.IFrameView)

export { BasicLayout, IFrameView }
