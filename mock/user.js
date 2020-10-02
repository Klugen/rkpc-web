
// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

const users = {
  'jining_token': {
    roles: ['admin'],
    introduction: '管理员',
    avatar: '',
    name: '超级管理员',
    cid: ['']
  },
  'btl_token': {
    roles: ['admin'],
    introduction: '管理员',
    avatar: '',
    name: '白塔岭街道办',
    cid: ['']
  },
  'pq_token': {
    roles: ['pq'],
    introduction: '片区管理员',
    avatar: '',
    name: '片区管理员',
    cid: ['19', '20']
  },
  'slyc_token': {
    roles: ['ca'],
    introduction: '社区管理员',
    avatar: '',
    name: '森林一城社区管理员',
    cid: ['19', '20']
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      console.log('XXX', config)
      const { username, password } = config.body
      if (username === 'jining' && password === '123456') {
        return {
          code: 0,
          data: { 'token': 'jining_token' }
        }
      }
      if (username === 'btl' && password === '123456') {
        return {
          code: 0,
          data: { 'token': 'btl_token' }
        }
      }
      if (username === 'pq' && password === '123456') {
        return {
          code: 0,
          data: { 'token': 'pq_token' }
        }
      }
      if (username === 'slyc' && password === '123456') {
        return {
          code: 0,
          data: { 'token': 'slyc_token' }
        }
      }
      return {
        code: 99,
        message: '用户名密码错误',
        data: null
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      console.log('tag', '开始执行获取用户信息函数')
      console.log('tag', config)
      const { token } = config.query
      const info = users[token]

      // // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息.'
        }
      }

      return {
        code: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
