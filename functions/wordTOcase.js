function wordTOcase(content){
  let contentarray = content.split(" ");
  let aftercontent = new Array();
  contentarray.forEach(el => {
    let firstpart = el.slice(0,1).toUpperCase();
    let secondpart = el.slice(1);
    let gotword = firstpart + secondpart;
    aftercontent.push(gotword);
  });
  let words = aftercontent.join(" ");
  return words
};
