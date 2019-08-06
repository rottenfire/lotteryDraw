$(function () {
  var localStore = window.localStorage;

  var localData = {}; // 本地数据
  var initiativeArr = []; // 可选为主动夸列表
  var passiveArr = []; // 可选为被夸列表
  var iArr = []; // 可选为主动夸操作列表
  var pArr = []; // 可选为被夸操作列表
  var iNow = []; // 本次选中主动夸的人
  var pNow = []; // 本次选中被夸的人
  var rollLock = false; // 滚动动画锁


  /**
   * 初始化
   */
  function init() {
    initData();
    resetActiveArr('b');
    initPersonList();
    initHistoryList();
    bindEvent();
  }



  /**
   * 初始化数据
   */
  function initData() {
    // localData = JSON.parse(localStore.getItem('lotteryData'));
    localData = getLocalStorage('lotteryData');
    // console.log(localData);
    if (!localData) {
      return;
    }
    data = localData.data;

    // 将可操作的数据分装到initiativeArr、passiveArr数组中
    for (var i = 0; i < data.length; i++) {
      if (data[i].state === 'un' || data[i].state === 'p') {
        initiativeArr.push(data[i].id);
      }
      if (data[i].state === 'un' || data[i].state === 'i') {
        passiveArr.push(data[i].id);
      }
    }
    // console.log('initiativeArr:', initiativeArr);
    // console.log('passiveArr:', passiveArr);
  }



  /**
   * 初始化人员列表
   */
  function initPersonList() {
    $('#person').html(setTemplate('personLi',localData));
  }


  /**
   * 初始化历史列表
   */
  function initHistoryList() {
    // console.log(liHtmlString);
    const hisData = getLocalStorage('lotteryHistoryListData');
    $('#hisList').html(setTemplate('historyList',hisData));
  }

  /**
   * 
   * @param {*} templateId 模板ID
   * @param {*} data 传入模板的数据
   * @return {string} 获得的模板结构字符串
   */
  const setTemplate = (templateId,data) => {
    return template(templateId,data);
  }

  /**
   * 重置操作列表iArr、pArr
   * @param {string} type 重置的数据类i:iArr、p:pArr、b:iArr&pArr
   */
  function resetActiveArr(type) {
    if (type === 'i' || type === 'b') {
      iArr = [].concat(...initiativeArr);
    }
    if (type === 'p' || type === 'b') {
      pArr = [].concat(...passiveArr);
    }
  }



  // 
  /**
   * 抽取主功能
   * @param {Number} personNum 需要选出的人个数
   * @param {Array} arr 抽取的基数组，内容为id
   * @param {String} type 抽取的类型  active_i:主动夸  active_p:被动夸
   */
  function pickFunction(personNum, arr, type) {
    // t = 1;
    setRollClass(1, personNum, arr, type);
  }


  /**
   * 设置人员动画class
   * @param {Number} initTime 
   * @param {Number} personNum 
   * @param {Array} arr 
   * @param {String} type 
   */
  const setRollClass = (initTime, personNum, arr, type) => {
    let t = initTime;
    let timer = setInterval(roll, t);
    // 逐渐缓慢滚动功能
    function roll() {
      rollLock = true;
      t += t / 4;
      // console.log(t);
      resArr = randPickN(personNum, arr);
      $('#person').children().removeClass(type);
      for (let i = 0; i < resArr.length; i++) {
        $('#person').find('#li' + resArr[i]).addClass(type);
      }
      if (t >= 500) {
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
          console.log('pNow:', pNow);
          addJump(pNow, 150);
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
          console.log('iNow:', iNow);
          addJump(iNow, 150);
          // console.log('pArr:', pArr);
        }
      }
      clearInterval(timer);
      if (t < 500) {
        timer = setInterval(roll, t);
      }
    }
  }


  /**
   * 随机抽取n个人
   * @param {number} personNum input传入的值，需要抽取的人数 
   * @param {Array} arr 抽取基数组，各项为人员id
   * 
   * @return {Array}返回id组成的数组
   */
  function randPickN(personNum, arr) {
    if (arr.length === 0) {
      return [];
    }
    if (personNum >= arr.length) {
      return arr;
    }
    let resArr = []; //抽取到的结果数组
    let oriArr = [].concat(...arr);
    for (var i = 0; i < personNum; i++) {
      var num = Math.ceil(Math.random() * oriArr.length - 1);
      resArr.push(oriArr[num]);
      oriArr.splice(num, 1);
    }
    return resArr;
  }


  /**
   *  保存本次选中人的信息
   */
  function saveData() {
    // console.log(iNow);
    // console.log(pNow);
    iNow.forEach(function (ele, i) {
      // console.log(ele);
      localData.data.forEach(function (item, idx) {
        if (item.id === ele) {
          // console.log(item);
          // console.log('存在iiiiiiiii');
          if (item.state === 'un') {
            localData.data[idx].state = 'i';
            // console.log(localData.data[idx]);
          } else if (item.state === 'p') {
            localData.data[idx].state = 'b';
            // console.log(localData.data[idx]);
          }
        }
      })
    });
    pNow.forEach(function (ele, i) {
      // console.log(ele);
      localData.data.forEach(function (item, idx) {
        if (item.id === ele) {
          // console.log(item);
          // console.log('存在pppppppp');
          if (item.state === 'un') {
            localData.data[idx].state = 'p';
            // console.log(localData.data[idx]);
          } else if (item.state === 'i') {
            localData.data[idx].state = 'b';
            // console.log(localData.data[idx]);
          }
        }
      })
    });
    formatHistoryData();
    // console.log(localData.data);
    var saveD = JSON.stringify(localData);
    // console.log(saveD);
    localStore.setItem('lotteryData', saveD);
  }


  /**
   * 格式化本次选中人的信息用于保存于lotteryHistoryListData
   */
  const formatHistoryData = () => {
    console.log(iNow);
    console.log(pNow);

    let perData = getLocalStorage('lotteryData');
    let pData = [];
    let iData = [];
    iNow.forEach(ele => {
      pData.push(perData.data[ele].name);
    })
    pNow.forEach(ele => {
      iData.push(perData.data[ele].name);
    })

    const hisData = {
      date: formatDate(),
      title: '第几天？',
      iList: iData,
      pList: pData
    }
    let oldData = getLocalStorage('lotteryHistoryListData');
    if(!oldData) {
      oldData.data = [];
    }
    oldData.data.push(hisData);

    console.log(oldData);
    saveLocalStorage('lotteryHistoryListData', oldData);
  }



  /**
   * 获取localStorage数据
   * @param {string} localName 存储名称
   * @return {*} 返回本地存储的数据
   */
  const getLocalStorage = (localName) => {
    let objData = JSON.parse(localStore.getItem(localName));
    return objData;
  }


  /**
   * 存储至localStorage
   * @param {string} localName 存储名称
   * @param {object/array/string/number} data 需存储的数据
   */
  const saveLocalStorage = (localName, data) => {
    let dataJSON;
    if (typeof (data) === 'object') {
      dataJSON = JSON.stringify(data);
    } else {
      dataJSON = data;
    }
    localStore.setItem(localName, dataJSON);
  }


  /**
   * 格式化时间
   * @return yyyy-mm-dd hh:mi
   */
  const formatDate = () => {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let min = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
  }


  /**
   * 重置数据
   */
  function resetData() {
    localData.data.forEach(function (ele, i) {
      ele.state = 'un';
    })
    var saveD = JSON.stringify(localData);
    localStore.setItem('lotteryData', saveD);
  }



  /**
   *  刷新页面
   */
  const freshPage = () => {
    window.location.reload();
  }



  /**
   * 添加跳起来动画
   * @param {Array} arr 需要设置跳起来的动画的人员列表
   * @param {number} maxTime 使得每个块跳动有延迟，最大延迟时间
   */
  function addJump(arr, maxTime) {
    arr.forEach(function (ele) {
      var time = Math.ceil(Math.random() * maxTime);
      setTimeout(function () {
        $('#person').find('#li' + ele).addClass('jump');
      }, time);
    })
  }




  /**
   * 删除跳起来动画
   * @param {Array} arr 需要删除跳起来的动画的人员列表
   */
  function removeJump(arr) {
    arr.forEach(function (ele) {
      $('#person').find('#li' + ele).removeClass('jump');
    })
  }




  /**
   * 为各个按钮绑定事件
   */
  function bindEvent() {
    // 被夸人按钮事件
    $('#pBtn').on('click', function () {
      if (rollLock) {
        return;
      }
      console.log('pNow:-----', pNow);
      removeJump(pNow);
      resetActiveArr('i');
      pickFunction(1, pArr, 'active_p');
    });

    // 主动夸人按钮事件
    $('#iBtn').on('click', function () {
      if (rollLock) {
        return;
      }
      console.log('iNow:-----', iNow);

      var num = $('#iInput').val() ? parseInt($('#iInput').val()) : 5;
      removeJump(iNow);
      resetActiveArr('p');
      pickFunction(num, iArr, 'active_i');
    });

    // 保存本次选择按钮事件
    $('#saveBtn').on('click', function () {
      if (rollLock) {
        return;
      }
      saveData();
      freshPage();
    });

    // 重置按钮事件
    $('#resetBtn').on('click', function () {
      if (rollLock) {
        return;
      }
      $('#deleteModal').modal('show');
    })

    // 确认重置按钮事件
    $('#confirmBtn').on('click', function () {
      resetData();
      freshPage();
    })

    // 刷新按钮事件
    $('#refreshBtn').on('click', function () {
      if (rollLock) {
        return;
      }
      freshPage();
    })

    // 重置列表按钮事件
    $('#resetHisBtn').on('click',function() {
      saveLocalStorage('lotteryHistoryListData',{data:[]});
      freshPage();
    })

    // input框输入去掉非数字字符
    $('#iInput').on('keyup', function (e) {
      // console.log($(this).val());
      console.log('key', e.keyCode);
      var personNum = $(this).val();
      if (e.keyCode > 57 || e.keyCode < 48 && e.keyCode !== 13 && e.keyCode !== 8) {
        // console.log('cuole !');
        personNum = personNum.substring(0, personNum.length - 1);
        $(this).val(personNum);
      }
      // console.log(personNum);
    })
  }

  //调用初始化
  init();


});