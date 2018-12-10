function checkUser(f){
  console.log("user.js->checkUser",f)
  const adminUserM = wx.getStorageSync('adminUserM');
  if ((adminUserM && !adminUserM.modify) || !adminUserM) {
    console.log("user.js->checkUser跳转login", f)
    console.log("")
    wx.redirectTo({
      url: '/pages/login/login',
    })
    return false;
  }else{
    if(f!="index.js"){
      console.log("user.js->checkUser跳转index", f)    
      wx.switchTab({
        url: '/pages/index/index',
      })
    }

    return true;

  }

}
function checkModfiy(f){
  console.log("user.js->checkModfiy", f)
  
  const adminUserM = wx.getStorageSync('adminUserM');  
  if ((adminUserM && !adminUserM.modify) || !adminUserM) {
    console.log("user.js->checkModfiy跳转editUser", f)
    wx.redirectTo({
      url: '/pages/me/user/editUser'
    })
    
    return false;
  } else{
    console.log("user.js->checkModfiy跳转index", f)
    wx.switchTab({
      url: '/pages/index/index',
    })
    return true;
  }
}
module.exports={
  checkUser,
  checkModfiy
}