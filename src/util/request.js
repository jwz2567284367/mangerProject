import axios from 'axios'
import qs from 'qs'

const baseurl = '/api'


axios.interceptors.response.use(res => {
  console.log("========请求路径：" + res.config.url + "=============");
  console.log(res);
  return res
})


// 菜单模块的添加
// 菜单添加
export const reqmenuadd = (data) => {
  return axios({
    url: baseurl + '/api/menuadd',
    method: 'post',
    data: data,
  })
}
// 菜单列表
export const reqmenulist = (data) => {
  return axios({
    url: baseurl + '/api/menulist',
    method: 'get',
    params: data,
  })
}
// 获取一条数据
// 菜单列表
export const reqmenulistone = (data) => {
  return axios({
    url: baseurl + '/api/menuinfo',
    method: 'get',
    params: data,
  })
}
// 菜单修改
export const reqmenuedit = (data) => {
  return axios({
    url: baseurl + '/api/menuedit',
    method: 'post',
    data: data,
  })
}
// 菜单删除
export const reqmenudel = (data) => {
  return axios({
    url: baseurl + '/api/menudelete',
    method: 'post',
    data: data,
  })
}


/////////////角色管理/////////////////
// 角色添加
export const reqroleadd = (data) => {
  return axios({
    url: baseurl + '/api/roleadd',
    method: 'post',
    data: data,
  })
}
// 角色列表
export const reqrolelist = (data) => {
  return axios({
    url: baseurl + '/api/rolelist',
    method: 'get',

  })
}
// 获取一条数据
export const reqrolelistone = (id) => {
  return axios({
    url: baseurl + '/api/roleinfo',
    method: 'get',
    params: id
  })
}
// 角色修改
export const reqroleedit = (id) => {
  return axios({
    url: baseurl + '/api/roleedit',
    method: 'post',
    data: id
  })
}
// 角色删除
export const reqroledel = (id) => {
  return axios({
    url: baseurl + '/api/roledelete',
    method: 'post',
    data: id
  })
}




////////////////////////管理员管理/////////////////////////

// 管理员添加
export const requseradd = (data) => {
  return axios({
    url: baseurl + '/api/useradd',
    method: 'post',
    data: qs.stringify(data),
  })
}
// 管理员列表
export const requserlist = (params) => {
  return axios({
    url: baseurl + '/api/userlist',
    method: 'get',
    params: params
  })
}
// 获取一条管理员数据
export const requserlistone = (id) => {
  return axios({
    url: baseurl + '/api/userinfo',
    method: 'get',
    params: id
  })
}
// 管理员修改
export const requseredit = (id) => {
  return axios({
    url: baseurl + '/api/useredit',
    method: 'post',
    data: id
  })
}
// 管理员删除
export const requserdel = (id) => {
  return axios({
    url: baseurl + '/api/userdelete',
    method: 'post',
    data: id
  })
}
// 管理员总数
export const requsercount = () => {
  return axios({
    url: baseurl + '/api/usercount',
    method: 'get',

  })
}




////////////////////////商品分类/////////////////////////


// 商品分类添加
export const reqcateadd = (data) => {
  // 由于上传的是文件，用qs转一下
  var form = new FormData();
  for (var i in data) {
    form.append(i, data[i])
  }
  return axios({
    url: baseurl + '/api/cateadd',
    method: 'post',
    data: form,
  })
}
// 商品分类列表
export const reqcatelist = (params) => {
  return axios({
    url: baseurl + '/api/catelist',
    method: 'get',
    params: params
  })
}
// 获取一条商品分类数据
export const reqcatelistone = (id) => {
  return axios({
    url: baseurl + '/api/cateinfo',
    method: 'get',
    params: id
  })
}
// 商品分类修改
export const reqcateedit = (data) => {
  var form = new FormData();
  for (var i in data) {
    form.append(i, data[i])
  }
  return axios({
    url: baseurl + '/api/cateedit',
    method: 'post',
    data: form
  })
}
// 商品分类删除
export const reqcatedel = (id) => {
  return axios({
    url: baseurl + '/api/catedelete',
    method: 'post',
    data: id
  })
}


////////////////////////商品规格/////////////////////////
// 商品规格添加
export const reqspecsadd = (data) => {

  return axios({
    url: baseurl + '/api/specsadd',
    method: 'post',
    data: data,
  })
}
// 商品规格列表
export const reqspecslist = (params) => {
  return axios({
    url: baseurl + '/api/specslist',
    method: 'get',
    params: params
  })
}
// 获取一条商品规格数据
export const reqspecslistone = (id) => {
  return axios({
    url: baseurl + '/api/specsinfo',
    method: 'get',
    params: id
  })
}
// 商品规格修改
export const reqspecsedit = (data) => {

  return axios({
    url: baseurl + '/api/specsedit',
    method: 'post',
    data: data
  })
}
// 商品规格删除
export const reqspecsdel = (id) => {
  return axios({
    url: baseurl + '/api/specsdelete',
    method: 'post',
    data: id
  })
}
