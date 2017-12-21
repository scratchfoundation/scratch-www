// Note: jQuery needed
var result;
var allowedExtensions = [];
function checkExt(name,codesite,downloadsite) {
var datavar;
$.get(codesite,function(data,status){datavar=data;});
// a code idea for code-based filters
if (datavar.search("post")===-1) {
// other filters like this would go inside here and the following code would go inside all of them
var website;
$.get("view-source:"+downloadsite,function(data,status){website=data;});
if(website.search(codesite)!==-1) {
result = true;
allowedExtensions.push(name);
//code described in previous comment ends here.
}
}
}

var extensions = ["extension1"];
var downloadsites = ["http://extension1.tk/download"];
var codesites = ["http://extension1.tk/code"];
var siteinfo = document.getElementsByTagName("body")[0].innerHTML;
var sitedata;
var sitedatatwo;
for(var i=0;i<extensions.length;i++) {
result = false;
checkExt(extensions[i],codesites[i],downloadsites[i]);
if(result===false) {
if(siteinfo.search(extensions[i])!==-1){
sitedata = siteinfo;
sitedata = sitedata.split("var allowedExtensions = [];");
sitedatatwo = sitedata[0];
siteinfo=sitedatatwo.replace(eval("/"+extensions[i]+"/g"))+sitedata[1];
}
}
}
document.getElementsByTagName("body")[0].innerHTML=siteinfo;
