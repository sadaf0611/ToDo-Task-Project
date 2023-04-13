async function formfunction(event)
{
    try{

    
    event.preventDefault();
    
    const title=document.getElementById('title').value;
    const disc=document.getElementById('disc').value;
    const isDone=false;
    console.log(title+disc+isDone);
    const obj={
        title,
        disc,
        isDone:false
    }
    await axios.post("https://crudcrud.com/api/5afb8d0b0c2549379bd3f2177745e67a/todoData",obj)
    
    // .catch((err)=>{
    //     console.log(err);
    // })
    // show(obj);
    location.reload();
    }
    catch(err)
    {
        console.log(err);
    }
}
async function show(obj){
    try{

    
    document.getElementById('title').value='';
    document.getElementById('disc').value='';
    const tparentNode1=document.getElementById('remaining-tbody');
    const parentNode2=document.getElementById('done-tbody');

    
    await axios.get("https://crudcrud.com/api/5afb8d0b0c2549379bd3f2177745e67a/todoData")
    
    
    if(obj.isDone==false){
        // const childHTML=`<li id=${obj._id} style="text-decoration: none;">${obj.title}____${obj.disc}____
        // <input type="checkbox" onclick=taskDone('${obj._id}','${obj.title}','${obj.disc}')>
        // <button  onclick=deleteTask('${obj._id}') class="btn btn-danger btn-sm float-right delete">delete</button>
        // </li>`;
        // parentNode1.innerHTML=parentNode1.innerHTML+childHTML;  
        const tchildHTML1=`<tr id=${obj._id}><td>${obj.title}</td><td>${obj.disc}</td><td>
        <input type="checkbox" onclick=taskDone('${obj._id}','${obj.title}','${obj.disc}')>
        <button  onclick=deleteTask('${obj._id}') class="btn btn-danger btn-sm float-right delete">delete</button></td><tr>`;
        tparentNode1.innerHTML=tparentNode1.innerHTML+tchildHTML1; 
        console.log(obj._id,obj.title,obj.disc);
    }
    else{
        const childHTML=`<tr id=${obj._id}><td>${obj.title}</td><td>${obj.disc}</td><td>`;
        parentNode2.innerHTML=parentNode2.innerHTML+childHTML;   
    }
    }
    catch(err)
    {
        console.log(err);
    }
                
}
window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const response= await axios.get("https://crudcrud.com/api/5afb8d0b0c2549379bd3f2177745e67a/todoData")
        for(var i=0; i < response.data.length ; i++)
        {
            show(response.data[i]);
        }
    }
    catch(err)
    {
        console.log(err);
    }    
    
})
function taskDone(id,title,disc)
{
    
        console.log(id);
        axios.delete(`https://crudcrud.com/api/5afb8d0b0c2549379bd3f2177745e67a/todoData/${id}`)
        .then(()=>{
            const parentNode=document.getElementById('done');
            const childHTML=`<tr id=${id}><td>${title}</td><td>${disc}</td><td>`
            parentNode.innerHTML=parentNode.innerHTML+childHTML;
            const tab=document.getElementById('remaining-tbody');
            const tr=document.getElementById(id);
            
            if(id)
            {
                tab.deleteRow(tr);
            }
            const obj={
                title,
                disc,
                isDone:true
            }
            axios.post("https://crudcrud.com/api/5afb8d0b0c2549379bd3f2177745e67a/todoData",obj);
        })
        .catch((err)=>{
            console.log(err);
        })
        
    
}
async function deleteTask(id)
{
    try{
    const response = axios.delete(`https://crudcrud.com/api/5afb8d0b0c2549379bd3f2177745e67a/todoData/${id}`)
    
        const tab=document.getElementById('remaining-tbody');
        const tr=document.getElementById(id);
        console.log(tab);
        if(tr)
        {
            tab.deleteRow(tr);
        }
    
    }
    catch(err)
    {
        console.log(err);
    } 
}