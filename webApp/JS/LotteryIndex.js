$(function () {
  var localStore = window.localStorage;
  // 本地数据
  var localData = {};
  // 可选为主动夸列表
  var initiativeArr = [];
  // 可选为被夸列表
  var passiveArr = [];
  // 可选为主动夸操作列表
  var iArr = [];
  // 可选为被夸操作列表
  var pArr = [];
  // 本次选中主动夸的人
  var iNow = [];
  // 本次选中被夸的人
  var pNow = [];
  // 滚动动画锁
  var rollLock = false;
  // 一次性抽取的人数
  // var perNum = 1;

  initData();
  resetActiveArr('b');
  initPage();

  // 初始化数据
  function initData() {
    localData = JSON.parse(localStore.getItem('lotteryData'));
    // console.log(localData);
    data = localData.data;
    console.log(localData.data);
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].state === 'un' || data[i].state === 'p') {
        initiativeArr.push(data[i].id);
      }
      if (data[i].state === 'un' || data[i].state === 'i') {
        passiveArr.push(data[i].id);
      }
    }
    console.log('initiativeArr:', initiativeArr);
    console.log('passiveArr:', passiveArr);
  }

  // 初始化界面
  function initPage() {
    var liHtmlString = template('personLi', localData);
    // console.log(liHtmlString);
    $('#person').html(liHtmlString);
  }

  // 重置操作列表
  function resetActiveArr(type) {
    if (type === 'i' || type === 'b') {
      iArr = [];
      for (var i = 0; i < initiativeArr.length; i++) {
        iArr[i] = initiativeArr[i];
      }
    }
    if (type === 'p' || type === 'b') {
      pArr = [];
      for (var i = 0; i < passiveArr.length; i++) {
        pArr[i] = passiveArr[i];
      }
    }
  }

  // 抽取主功能
  function pickFunction(n, arr, type) {
    t = 2;
    var timer = setInterval(roll, t);
    // 逐渐缓慢滚动功能
    function roll() {
      rollLock = true;
      t += t / 2;
      // console.log(t);
      resArr = randPickN(n, arr);
      $('#person').children().removeClass(type);
      for (var i = 0; i < resArr.length; i++) {
        $('#person').find('#li' + resArr[i]).addClass(type);
      }
      if (t >= 500) {
        // TODO:增加动画效果（蹦跳）
        rollLock = false;
        // console.log(resArr);
        // 移除另外数组中当前被选中的元素
        if (type === 'active_p') {
          pNow = [];
          // console.log('iArr:', iArr);
          resArr.forEach(function (ele, i) {
            if (iArr.indexOf(ele) !== -1) {
              iArr.splice(iArr.indexOf(ele), 1);
            }
            pNow[i] = ele;
          });
          console.log('pNow:',pNow);
          // console.log('iArr:', iArr);
        } else if (type === 'active_i') {
          iNow = [];
          // console.log('pArr:', pArr);
          resArr.forEach(function (ele, i) {
            if (pArr.indexOf(ele) !== -1) {
              pArr.splice(pArr.indexOf(ele), 1);
            }
            iNow[i] = ele;
          });
          console.log('iNow:',iNow);
          // console.log('pArr:', pArr);
        }
        // console.log('完成啦');
      }
      clearInterval(timer);
      if (t < 500) {
        timer = setInterval(roll, t);
      }
    }
  }


  // 随机抽取n个人,返回id组成的数组
  function randPickN(n, arr) {
    if (n > arr.length) {
      return;
    }
    var oriArr = [];
    var resArr = [];
    for (var i = 0; i < arr.length; i++) {
      oriArr[i] = arr[i];
    }
    for (var i = 0; i < n; i++) {
      var num = Math.ceil(Math.random() * oriArr.length - 1);
      resArr.push(oriArr[num]);
      oriArr.splice(num, 1);
    }
    return resArr;
  }


  // 保存本次选中人的信息
  function saveData() {
    // console.log(iNow);
    // console.log(pNow);
    iNow.forEach(function (ele, i) {
      // console.log(ele);
      localData.data.forEach(function (item, idx) {
        if (item.id === ele) {
          console.log(item);
          console.log('存在iiiiiiiii');
          if(item.state === 'un') {
            localData.data[idx].state = 'i';
            console.log(localData.data[idx]);
          } else if (item.state === 'p') {
            localData.data[idx].state = 'b';
            console.log(localData.data[idx]);
          }
        }
      })
    });
    pNow.forEach(function (ele, i) {
      // console.log(ele);
      localData.data.forEach(function (item, idx) {
        if (item.id === ele) {
          console.log(item);
          console.log('存在pppppppp');
          if(item.state === 'un') {
            localData.data[idx].state = 'p';
            console.log(localData.data[idx]);
          } else if (item.state === 'i') {
            localData.data[idx].state = 'b';
            console.log(localData.data[idx]);
          }
        }
      })
    });
    console.log(localData.data);
    var saveD = JSON.stringify(localData);
    console.log(saveD);
    localStore.setItem('lotteryData',saveD);
  }

  // 被夸人按钮事件
  $('#pBtn').on('click', function () {
    if (rollLock) {
      return;
    }
    resetActiveArr('i');
    pickFunction(1, pArr, 'active_p');
  });

  // 主动夸人按钮事件
  $('#iBtn').on('click', function () {
    if (rollLock) {
      return;
    }
    resetActiveArr('p');
    pickFunction(5, iArr, 'active_i');
  });

  // 保存本次选择按钮事件
  $('#saveBtn').on('click', function () {
    saveData();
  });




});