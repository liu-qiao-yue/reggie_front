import { createRouter, createWebHistory } from 'vue-router';
import _ERROR_401 from '@/components/error/401.vue';
import _ERROR_403 from '@/components/error/403.vue';
import _ERROR_404 from '@/components/error/404.vue';
import _ERROR_500 from '@/components/error/500.vue';
import BasicLayout from '@/components/layout/BasicLayout.vue';
import Layout from '@/components/layout/Layout.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '',
      component: Layout,
      redirect: '/login',
      children: [
        {
          name: 'login',
          path: '/login',
          component: () => import(`@/components/login/LoginIndex.vue`), // 使用 _import 函数动态导入 EmployeeLogin
          meta: {
            title: '登录页', // 标题
            keepAlive: false, // 是否保存
            id: 1, // 唯一标识符
            noCache: true // 是否缓存
          }
        },
        {
          path: '/changePassword',
          component: ()=> import(`@/components/login/ChangePassword.vue`),
          name: 'changePassword',
          meta: { title: '修改密码', noCache: true, keepAlive: false, id: '2' }
        },
        {
          path: '/forgotPassword',
          component: ()=> import(`@/components/login/ForgotPassword.vue`),
          name: 'forgotPassword',
          meta: { title: '忘记密码', noCache: true, keepAlive: false, id: '3' }
        },
      ]
    },
    {
      path: '/employee',
      component: BasicLayout,
      redirect: '/member/index',
      meta: { title: '管理端', keepAlive: true, id: "3" },
      children: [
        {
          path: 'member/index',
          component: () => import(`@/components/member/MemberIndex.vue`),
          name: 'memberInfo',
          meta: { title: '管理端/员工页面', noCache: true, keepAlive: false, id: '4' }
        },
        {
          path: 'category/index',
          component: () => import(`@/components/category/CategoryIndex.vue`),
          name: 'categoryInfo',
          meta: { title: '管理端/分类页面', noCache: true, keepAlive: false, id: '5' }
        },
        {
          path: 'dish/index',
          component: () => import(`@/components/dish/DishIndex.vue`),
          name: 'dishInfo',
          meta: { title: '管理端/菜品页面', noCache: true, keepAlive: false, id: '6' }
        },
        {
          path: 'config/index',
          component: () => import(`@/components/config/ConfigIndex.vue`),
          name: 'configInfo',
          meta: { title: '管理端/配置页面', noCache: true, keepAlive: false, id: '7' }
        },
        {
          path: 'setmeal/index',
          component: () => import(`@/components/setmeal/SetmealIndex.vue`),
          name: 'setmealInfo',
          meta: { title: '管理端/套餐页面', noCache: true, keepAlive: false, id: '8' }
        },
        {
          path: 'order/index',
          component: () => import(`@/components/order/OrderIndex.vue`),
          name: 'orderInfo',
          meta: { title: '管理端/订单页面', noCache: true, keepAlive: false, id: '9' }
        },
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: BasicLayout,
      meta: { title: 'error', hidden: true },
      children: [
        {
          path: '/401',
          name: '401',
          component: _ERROR_401,
          meta: { title: '401', hidden: true }
        },
        {
          path: '/403',
          name: '403',
          component: _ERROR_403,
          meta: { title: '403', hidden: true }
        },
        {
          path: '/404',
          name: '404',
          component: _ERROR_404,
          meta: { title: '404', hidden: true }
        },
        {
          path: '/500',
          name: '500',
          component: _ERROR_500,
          meta: { title: '500', hidden: true }
        }
      ]
    },
    // catch-all 路由
    {
      path: '/:pathMatch(.*)*', // 使用正则表达式匹配所有路径
      name: 'catch-all',
      component: _ERROR_404, // 使用 404 页面作为 catch-all 页面
      meta: { title: '404', hidden: true }
    }
  ]
});

export default router;