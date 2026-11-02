export function clampSeek(position,duration){return Number.isFinite(duration)&&duration>0?Math.max(0,Math.min(Number.isFinite(position)?position:0,duration)):0}
export function attachMediaSession(session,audio,actions){
 if(!session)return()=>{};
 const seek=value=>{audio.currentTime=clampSeek(value,audio.duration);actions.position?.()};
 const handlers={play:actions.play,pause:()=>audio.pause(),previoustrack:actions.previous,nexttrack:actions.next,stop:()=>{audio.pause();seek(0)},seekbackward:d=>seek(audio.currentTime-(d.seekOffset??10)),seekforward:d=>seek(audio.currentTime+(d.seekOffset??10)),seekto:d=>seek(d.seekTime)};
 const installed=[];for(const[action,handler]of Object.entries(handlers)){try{session.setActionHandler(action,handler);installed.push(action)}catch{}}
 return()=>{for(const action of installed)try{session.setActionHandler(action,null)}catch{}};
}
export function updatePosition(session,audio){if(!session?.setPositionState)return;try{if(Number.isFinite(audio.duration)&&audio.duration>0)session.setPositionState({duration:audio.duration,playbackRate:audio.playbackRate||1,position:clampSeek(audio.currentTime,audio.duration)});else session.setPositionState()}catch{}}
