const { default: axios } = require("axios");

const Mpurl = "https://www.gqbzds.com/wp-json/mp/v2/";
const Wpurl = "https://www.gqbzds.com/wp-json/wp/v2/";

const grandMaster = async function (req) {
  const { page, type, tags, cats } = req.body;
  let url=''
  let status=false;
  switch (type) {
    //   最热
    case "hot":
      url = Mpurl+`posts?custom=most&per_page=${page * 30}`;
      break;
    // 最新
    case "new":
      url += Mpurl+`posts?custom=rand&per_page=${page * 30}`;
      break;
    // 随机
    case "rank":
      url += Mpurl+`posts?orderby=rand&per_page=${page * 30}`;
      break;
	// 所有标签
	case "alltags":
      url = Wpurl+`https://www.gqbzds.com/wp-json/wp/v2/tags?orderby=id&order=asc&hide_empty=true&per_page=10`;
	  status=true;
      break;
    // 标签详情
    case "tagdet":
      url += Wpurl+`posts?tags=${tags}`;
      break;
    case "tagdet":
      url += `posts?tags=${tags}`;
      break;
  }
  return gethot(url,status);
};
async function gethot(url,status) {
  const data = axios.get(url).then((res) => {
	  if(status){
		  return gettags(res.data)
	  }
    return getdata(res.data);
  });
  return await data;
}
function gettags(data){
	let dataArr=[]
	data.forEach(item=>{
		dataArr.push({id:item.id,name:item.name});
	})
	return  dataArr
}
function getdata(data) {
  let dataArr = [];
  data.forEach((item) => {
    item.wallpaper.forEach((val) => {
      dataArr.push({ id: val.id, src: val.full });
    });
  });
  return dataArr;
}
module.exports = grandMaster;
