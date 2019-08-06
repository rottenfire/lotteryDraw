// 生成localStorage数据
$(function() {
  var local = window.localStorage;

  var person = {
    data: [
    {id: 0,name: '齐盼', state: 'un'},
    {id: 1,name: '计欣奇', state: 'un'},
    {id: 2,name: '刘龙', state: 'un'},
    {id: 3,name: '闫万鹏', state: 'un'},
    {id: 4,name: '王涛', state: 'un'},
    {id: 5,name: '韩磊', state: 'un'},
    {id: 6,name: '王东东', state: 'un'},
    {id: 7,name: '王士林', state: 'un'},
    {id: 8,name: '李佳亮', state: 'un'},
    {id: 9,name: '郭育如', state: 'un'},
    {id: 10,name: '张家维', state: 'un'},
    {id: 11,name: '孙志强', state: 'un'},
    {id: 12,name: '郭嘉', state: 'un'},
    {id: 13,name: '袁爽', state: 'un'},
    {id: 14,name: '宫海龙', state: 'un'},
    {id: 15,name: '徐菲菲', state: 'un'},
    {id: 16,name: '吕宝双', state: 'un'},
    {id: 17,name: '左江龙', state: 'un'},
    {id: 18,name: '刘慧雨', state: 'un'},
    {id: 19,name: '陈可欣', state: 'un'},
    {id: 20,name: '刘晓臣', state: 'un'},
    {id: 21,name: '闵艳宇', state: 'un'},
    {id: 22,name: '李佳兴', state: 'un'},
    {id: 23,name: '于子文', state: 'un'},
    {id: 24,name: '张文法', state: 'un'},
    {id: 25,name: '刘珊', state: 'un'},
    {id: 26,name: '班乐', state: 'un'},
    {id: 27,name: '仪洲', state: 'un'},
    {id: 28,name: '张俊', state: 'un'},
    {id: 29,name: '张佳佳', state: 'un'},
    {id: 30,name: '齐笑天', state: 'un'},
    {id: 31,name: '任星潼', state: 'un'},
    {id: 32,name: '王溶', state: 'un'},
    {id: 33,name: '徐文善', state: 'un'},
    {id: 34,name: '徐作肖', state: 'un'},
    {id: 35,name: '于学哲', state: 'un'},
    {id: 36,name: '孙海永', state: 'un'},
    {id: 37,name: '张伟', state: 'un'},
    {id: 38,name: '谢军凯', state: 'un'},
    {id: 39,name: '何延雪', state: 'un'},
    {id: 40,name: '张晨', state: 'un'},
    {id: 41,name: '王伟达', state: 'un'},
    {id: 42,name: '王站', state: 'un'},
    {id: 43,name: '马凯', state: 'un'},
    {id: 44,name: '佘迎宝', state: 'un'},
    {id: 45,name: '胡凯', state: 'un'},
    {id: 46,name: '汤渔涛', state: 'un'},
    {id: 47,name: '田亚鹏', state: 'un'},
    {id: 48,name: '薛雄飞', state: 'un'},
    {id: 49,name: '张轲', state: 'un'},
    {id: 50,name: '张帅', state: 'un'},
    {id: 51,name: '王菡珺', state: 'un'}
  ]}


  if(!local.getItem('lotteryData')) {
    var per = JSON.stringify(person);
    local.setItem('lotteryData',per);
    window.location.reload();
  }



  let initHistoryList = {
    data: [
      // {
      //   title: '第一天',
      //   date: '2019-8-5 19:30',
      //   iList: ['王伟达','张轲','张帅','王菡珺','王站'],
      //   pList: ['孙海永']
      // },
      // {
      //   title: '第二天',
      //   date: '2019-8-6 9:30',
      //   iList: ['徐作肖','张三','李四','王五','赵柳'],
      //   pList: ['萧瑟']
      // },
    ]
  }
 
  if(!local.getItem('lotteryHistoryListData')) {
    var per = JSON.stringify(initHistoryList);
    local.setItem('lotteryHistoryListData',per);
    // window.location.reload();
  }

});