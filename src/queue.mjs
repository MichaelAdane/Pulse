export function adjacentTrack(queue,currentId,step,shuffle=false,random=Math.random){
 if(!queue.length)return null;
 const index=queue.findIndex(t=>t.id===currentId);
 if(shuffle&&step>0&&queue.length>1){const choices=queue.filter(t=>t.id!==currentId);return choices[Math.floor(random()*choices.length)]}
 if(index<0)return queue[step<0?queue.length-1:0];
 return queue[(index+step+queue.length)%queue.length];
}
