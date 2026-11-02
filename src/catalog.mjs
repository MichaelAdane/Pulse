export const API='https://api.audius.co/v1';
const https=u=>typeof u==='string'&&u.startsWith('https://')?u:undefined;
export function normalizeTrack(t){
 if(!t||!t.id||!t.title||t.is_streamable!==true||t.is_stream_gated===true||t.is_available===false)return null;
 return {id:'audius-'+t.id,remoteId:t.id,title:t.title,artist:t.user?.name||'Audius artist',artistId:t.user?.id,artistImage:https(t.user?.profile_picture?.['480x480'])||https(t.user?.profile_picture?.['150x150']),artwork:https(t.artwork?.['480x480'])||https(t.artwork?.['150x150']),mood:t.genre||'Music',duration:t.duration||0,src:`${API}/tracks/${encodeURIComponent(t.id)}/stream?app_name=Pulse`,source:'Audius',color:'#b9d7c8',permalink:t.permalink?.startsWith('/')?'https://audius.co'+t.permalink:'https://audius.co'};
}
export async function fetchCatalog({query='',genre='All',signal}={}){
 const params=new URLSearchParams({app_name:'Pulse',limit:'36'});if(query.trim())params.set('query',query.trim());if(genre!=='All')params.set('genre',genre);
 const response=await fetch(`${API}/tracks/${query.trim()?'search':'trending'}?${params}`,{signal});
 if(!response.ok)throw Error(response.status===429?'Audius is receiving too many requests. Please try again shortly.':'The online catalog is unavailable right now. Please retry.');
 const result=await response.json();if(!Array.isArray(result.data))throw Error('The music service returned an unexpected response.');
 return result.data.map(normalizeTrack).filter(Boolean);
}
