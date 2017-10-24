import axios from 'axios'
import router from '.././router'

// /////////////////////////////跳转页面/////////////////////////////
export const handleClick = (state, index, row) => {
  localStorage.setItem('getBackPasswordSteps', '')
  if (typeof index === 'string') {
    router.push(index)
  } else {
    router.push(index.name)
  }
}

// /////////////////////////////跳转页面/////////////////////////////
export const getUserData = (state, index, row) => {
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/user/detail',
    params: {
      accessToken: localStorage.getItem('accessToken')
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      var phone = response.data.data.phone
      var email = response.data.data.email
      if (phone !== '') {
        state.userData.phone = phone.substr(0, 3) + '****' + phone.substr(7)
      } else {
        state.userData.phone = '暂无'
      }
      if (email !== '') {
        state.userData.email = email.substr(0, 3) + '*****' + email.substr(email.length - 8)
      } else {
        state.userData.email = '暂无'
      }
      state.userData.phoneStatus = getSecurityToolsStatus(phone)
      state.userData.emailStatus = getSecurityToolsStatus(email)
      state.userData.qqStatus = getSecurityToolsStatus(response.data.data.qq)
      state.userData.weChatStatus = getSecurityToolsStatus(response.data.data.weChat)
    }
  }).catch(function (error) {
    console.log(error)
  })
}

function getSecurityToolsStatus(data) {
  if (data === '') {
    return 0
  } else {
    return 1
  }
}
