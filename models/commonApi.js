import {
  API
} from './apiModel.js';
const apiModel = new API(); //获取应用实例

// 上传附件
export function uploadFile(params) {
  return apiModel.apiPost(`/PartyBuilding_Api/app/file/upload`, params, () => { }, 'formdata')
}
// 根据版本获得开关值
export function versionSwitch(params) {
  return apiModel.apiPost(`/PartyBuilding_Api/app/versionSwitch/list`, params)
}