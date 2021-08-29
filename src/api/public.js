import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/public/login',
    method: 'post',
    data
  })
}
