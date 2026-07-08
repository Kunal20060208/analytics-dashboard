function ExportButton(){


function exportData(){


const data=[
["Metric","Value"],
["Revenue","50000"],
["Users","2450"]
];


const csv=data
.map(row=>row.join(","))
.join("\n");



const blob=new Blob(
[csv],
{
type:"text/csv"
}
);



const url=URL.createObjectURL(blob);


const link=document.createElement("a");


link.href=url;

link.download="analytics.csv";


link.click();


}



return(


<button

onClick={exportData}

className="
bg-green-600
text-white
px-5
py-3
rounded-xl
"

>

Export CSV

</button>


)


}


export default ExportButton;