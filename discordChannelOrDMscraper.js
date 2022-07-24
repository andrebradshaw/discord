async function scrapeCurrentDiscordChannel(){
    const rando = (n) => Math.round(Math.random() * n);
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
    function unqKey(array,key){  var q = [];  var map = new Map();  for (const item of array) {    if(!map.has(item[key])){        map.set(item[key], true);        q.push(item);    }  }  return q;}
    function downloadr(arr2D, filename) {
        var data = /.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el=> el.reduce((a,b) => a+'	'+b )).reduce((a,b) => a+''+b);
        var type = /.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
        var file = new Blob([data], {    type: type  });
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
          var a = document.createElement('a'),
          url = URL.createObjectURL(file);
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 10);
        }
    }
    const cn = (o, s) => o ? o.getElementsByClassName(s) : null;
    const tn = (o, s) => o ? o.getElementsByTagName(s) : null;
    const gi = (o, s) => o ? o.getElementById(s) : null;
    const ele = (t) => document.createElement(t);
    const attr = (o, k, v) => o.setAttribute(k, v);
    const reChar = (s) => typeof s == 'string' && s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;
    const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));
    function inlineStyler(elm,css){
        Object.entries(JSON.parse(
        css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
            .replace(/(?<=:\s*.+?);/g,'",')
            .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
            .replace(/\s*,\s*}/g,'}')
        )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
    }
    function topZIndexer(){
        let n = new Date().getTime() / 100000;
        let r = (n - Math.floor(n)) * 1000;
        return Math.round(n+r);
    }
    var cleanObject = (ob) => 
        Object.entries(ob).reduce((r, [k, v]) => {
        if( v != null && v != undefined && v !== "" && ( ['string','number','boolean','function','symbol'].some(opt=> typeof v == opt) || (typeof v == 'object' && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true) ) ) ) ) { 
            r[k] = v; 
            return r;
        } else { 
        return r; 
        }
        }, {});
    async function handleFetch(url,params_obj,type){ //all arguments are required
        const rando = (n) => Math.round(Math.random() * n);
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        async function handleResponse(res,type){
            if(type == 'json') return await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
            if(type == 'text') return await res.text().catch(err=> { console.log([err,url,params_obj]); return false });
            if(type == 'html') {
            let text = await res.text().catch(err=> { console.log([err,url,params_obj]); return false }); 
            return new DOMParser().parseFromString(text,'text/html');
            }else{ return false }
        }
        if(params_obj && url){
            var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
            if(res.status > 199 && res.status < 300) return await handleResponse(res,type);

            if(res.status == 429) {
            await delay(300000);
            let res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
            if(res.status > 199 && res.status < 300) return await handleResponse(res,type);
            else return {action: 'stop', status: res.status};
            }
            if(res.status > 399 && res.status < 900){
            await delay(4410);
            let res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
            if(res.status > 199 && res.status < 300) return await handleResponse(res,type);
            else return {action: 'stop', status: res.status};
            }
            if(res.status > 899) return {action: 'stop', status: res.status};
        } else {return false;}
    }
    function setQuickliCSS(main_cont_id){
        if(gi(document,`${main_cont_id}_style`)) gi(document,`${main_cont_id}_style`).outerHTML = '';
        let csselm = ele('style');
        a(csselm,[['class',`${main_cont_id}_style`]]);
        document.head.appendChild(csselm);
        csselm.innerHTML = `
            .quickli_options_container_main {
                background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23a6d5, #23d5ab);
                background-size: 400% 400%;
                animation: gradient_quickli 3s ease infinite;
            }
            @keyframes gradient_quickli {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
            `
    }
    setQuickliCSS('discord_dl_q');

    function createDownloadHTML() {
        if(gi(document,'downloading_notifier')) gi(document,'downloading_notifier').outerHTML = '';
        const body_width = document.body.getBoundingClientRect().width;
        const download_bar_width = body_width * 0.8;
        let cont = ele('div');
        a(cont, [['id', 'downloading_notifier'], ['style', `position: fixed; top: 100px; left: ${((body_width - download_bar_width)/2)}px; width: ${download_bar_width}px; z-index: ${topZIndexer()}; background: #1c1c1c; border: 2px solid #1c1c1c; border-radius: 0.2em;`]]);
        document.body.appendChild(cont);
        let perc = ele('div');
        a(perc, [['id', 'downloading_percentage_bar'],['class','quickli_options_container_main'], ['style', `width: 0px; height: 50px; border-bottom-right-radius: 0.2em; border-top-right-radius: 0.2em; transition: all 1s; background-color:`]]);
        cont.appendChild(perc);
        let txt = ele('div');
        a(txt, [['id', 'downloading_percentage_txt'], ['style', `color: #ffffff; width: ${download_bar_width}px;`]]);
        perc.appendChild(txt);
        txt.innerHTML = 'initiating download...';
    }
    function updateDownloadBar(obj){
        const {text,img,iteration,total_results,status} = obj;
        const body_width = document.body.getBoundingClientRect().width;
        const download_bar_width = body_width * 0.8;
        let cont = gi(document,'downloading_notifier');
        if(cont){
            let perc = gi(document,'downloading_percentage_bar');
            let txt = gi(document,'downloading_percentage_txt');
            cont.style.width = `${download_bar_width}px;}`;
            perc.style.width = `${( download_bar_width * ( iteration / total_results ) )}px`;
            let img_html = `<img style="justify-content: center; border-radius: 50%; width: ${img ? '45' : '32'}px; height: ${img ? '45' : '32'}px;" src="${img || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAEV0lEQVRoge2aW4hVVRjHf6eZsSyHMJwSa6KQrLFJK8ksxpLsAol0gcKHSqEofKmHHnyJKJIQ6yEoSF8yEKfQh25kkFIJhTXhJWJMu4mCF2oooqKxzH8sWCdWa9Zee++z9zn0sP6wYH9nf+v/ff+9LnuttQ8JCQkJCQkJCQkJCS2hkVVJUquc04Frgcvt9enAOHAM2Ad8CvzQ7uZqNMLSumuMcT1wH3ADMACcFvD524r+ENgEjNQYvxpMCxcsD0g6pNbwnaR7SsQqXEqjAPEcSQdbFOrjG0mzOyG41TG8ClgT+P0UsN2WPcCPwF/AJKAPuAq4FVicwfso8GIdPTRrDGci8vReDrTQCUnPSDq7YAtMk7RG0skA19r/U5d+KZDgsKSeFhObLOmdAOfzJXkattQq+LFAYstrGnMrA9yPlKh/l6RxSW9JelbSUFXBCwIJLa1zkpF0byDGQMG6T3j1VlUVPOIRPlyz2GZ53IuzrWC9jU6dUUlZk2Ihwcu8JDa1SWyzbPXi3Vmgzl7Hf4uk86sI3umQmdl4epsFX+wJ/ijHv1fSr47/akUmrdDyz8U8YIFjvwAcL/30yuGg9y6+EbgiwjATmOLYe2PR8gTf4dkbahBUBK94PksideZ49v4Yf0yw2QBc59i78shqhGmlUYduYYT6Uuf6N9tDWhJsuvOVjv1xh8SG4s2O+Ln3zE7s9xhpTPAsYJpjf52fY634yiG7CDgvg9wd3wfyEogJ9gMc6YzOf+EfEkwN+PTZh9HEaMDnP4gJ7vHsE6XSrY4/c/LBzjNdjv1FXtSY4D88u7eN4kI40/ttPODjj+1v80hjgo969oWFU60HMxwW07vGAqyXOdfHqwo24+GwYw90SGgTc53r74Gfc3z2FSGNCd5t371NLCqaaU1wt3hfZlDOcq4LvUVigk3r7nDsmV4S7cTNQL/Dvz0Qq9/r9rkTVp5gg7c9e2WHBLtxzE5ga8BnrmcX6tKZcHYjb3q7l/lt3i0t8uK9luH3pOc3w71fRfCQRzzSZsH7vXjzMvxed3wO+PerCPbJDda3SeyrXpx1Ed89jt/mugX3SfrFS2Z1zWLXevxH7almyHeqPYxo4qm6BZuyWBOxoSaxwwHuoYh/t6SFkh6U9Iak29oh2JQVgcQO2VPNVoSapI8FOJdVfYh1CTbl/kCCBp9IWiKpKyeZHnuO/FmAY0zSJQVF9UuaUlZwq9+W5gMfAGcF7plF/vt2lTZm18FnAOcCVwO32G/GIawD1lv+hn0Hd9kyDPxk67wL3G53VGYx9PkEYTV+W3LHkT+rVsEpW7IwaOM+Z4eBuX5a0pEyLZy30orhJLDCLjk32i+HVdCI9TgHg8A2aw7bOucUjVvnXx4mA0uBm4BrgAvsHrrbds1WMcnWG7Q7OHNsvBPYYuNtBpZPEJbRpdvxH48meu2Tryq42fKHnVOQu+3Z9XvAQ8FKZcdwQkJCQkJCQkJCQgkA/wBND93iSe1b/QAAAABJRU5ErkJggg=='}"></img>`;
        txt.innerHTML = `<div style="display: grid; grid-template-columns: 50px 40px 160px ${(download_bar_width - 270)}px; grid-gap: 8px;">${img_html}<div style="transform:translate(0px,15px);">${Math.floor( ( iteration / total_results ) * 10000)/100}%</div><div style="transform:translate(0px,15px);">complete</div><div style="transform:translate(0px,15px);">${text}</div></div>`;
            if(status !== true) cont.outerHTML = '';
        }
    }
    function formatJSONstring(s){
        if(/\{\w+:/.test(s)){
            try{
            return JSON.parse(JSON.stringify(s.split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/).map(line=> line.split(/(?<=\w+):/) ).map(kv=> {
                    let cleankey = kv[0]?.replace(/^\{/,'')?.replace(/^\b|\b$/g,'"')?.replace(/^'|'$/g,'"');
                    let cleanval = tryJSON(kv[1]?.replace(/\}$/,'')?.replace(/^'|'$/g,'"'));
                    let decoded = tryATOB(cleanval)
                    return {...{ [cleankey]:cleanval},...(decoded ? {[`atob_${cleankey}`]:decoded} : {})};
                }).reduce((a,b)=> { return {...a,...b} })))
            }
            catch(err){return s}
        }else{ return s}
    }
    function tryATOB(s){
        if(/==$/.test(s)){
            try { return atob(s); } catch(err) { return s}
        }else {return false}
    }
    function tryJSON(s,type){ 
        try{ return JSON.parse(s) } 
        catch(err){
            try { return type == 'formatJSONstring' ? formatJSONstring(s) : s; }
            catch(err){ return s; }
        }    
    }
    function getCookieAsJSON(){
        return document.cookie.split(/; /).map(i=> i.replace(/\b=(?!$|=)/,'__________').split(/__________/)).map(kv=> {
            let cleanval = typeof kv[1] == 'string' ? tryJSON(decodeURIComponent(kv[1]),'formatJSONstring') : kv[1];
            let decoded = tryJSON(tryATOB(cleanval),'formatJSONstring');
            return {
                ...{
                    [kv[0]]: cleanval
                },
                ...(decoded ? {[`atob_${kv[0]}`]:decoded} : {})
            }
        }).reduce((a,b)=> { return {...a,...b}});
    }
    var json_cookie = getCookieAsJSON()

    var authorization_discord;
    window.webpackChunkdiscord_app.push([
        [Math.random()], {}, (req) => {
            for (const m of Object.keys(req.c).map(x => req.c[x].exports).filter(x => x)) {
                if (m.default && m.default.getToken !== undefined) authorization_discord = m.default.getToken()
                if (m.getToken !== undefined) authorization_discord = m.getToken()
            }
        }
    ]);

    async function getDiscordData(params){
        var {uri_path} = params;
        var d = await handleFetch(`https://discord.com/api/v9/${uri_path}`, {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": authorization_discord,
              "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"103\", \"Chromium\";v=\"103\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-debug-options": "bugReporterEnabled",
              "x-discord-locale": json_cookie.locale,
              "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMy4wLjUwNjAuMTE0IFNhZmFyaS81MzcuMzYgRWRnLzEwMy4wLjEyNjQuNDkiLCJicm93c2VyX3ZlcnNpb24iOiIxMDMuMC41MDYwLjExNCIsIm9zX3ZlcnNpb24iOiIxMCIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzY2MDcsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9"
            },
            "referrer": "https://discord.com/app",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        },'json');
        return d;
    }

    function flattenObjectChildrend(ob){
        return Object.entries(ob).map(kv=> {
            return kv[1] && typeof kv[1] === 'object' && !Array.isArray(kv[1]) 
            ? Object.entries(kv[1]).map(kv2=> {
                return {
                    [`${kv[0]}_${kv2[0]}`]: kv2[1]
                }
            }).reduce((a,b)=> {return {...a,...b}})
            : {[kv[0]]: kv[1]}
        }).reduce((a,b)=> {return {...a,...b}})
    }

    async function getGuildData(id){
        var guild_info = await getDiscordData({uri_path:`guilds/${id}`});
        var guild_info_preview = await getDiscordData({uri_path:`guilds/${id}/preview`});
        var guild_channels = await getDiscordData({uri_path:`guilds/${id}/channels`});
        return {
            ...guild_info,
            ...guild_info_preview,
            ...{channels: guild_channels,},
        }
    }

    var guild_id = /(?<=channels\/)\d+/.exec(window.location.href)?.[0];
    if(guild_id){
        var guild_information = await getGuildData(guild_id);
        console.log(guild_information)
    }    
    async function loopThroughChannelMessages(channel_id,before){
        if(!before) createDownloadHTML();
        // var contain_arr = [];
        // var before = '';
        var last_response_length = 50;
        var max_pages = 1500;
        for(let i=0; i<max_pages; i++){
            let messages = await getDiscordData({uri_path:`channels/${channel_id}/messages?limit=50${before}`});
            before = messages?.length ? `&before=${messages?.at(-1)?.id}` : '';
            if(messages === false || messages?.action == 'stop') break;

            last_response_length = messages.length; /* use this to identify if there are more messages to pull */
            messages.map(r=> contain_arr.push(
                cleanObject({
                    ...flattenObjectChildrend(r),
                    ...(guild_information?.name ? {guild_name:guild_information?.name,guild_id:guild_id} :{}),
                    ...(chanel_information?.name ? {channel_name:chanel_information?.name} : {}),
                })
            ));
            for(let u=0; u<messages.length; u++){
                await delay(1+rando(40));
                updateDownloadBar({
                    text:`${Math.abs(contain_arr.length - (messages.length - u))} of ?? messages in ${guild_information?.name ? guild_information?.name+' (' : 'direct messages ('}${chanel_information?.name || channel_id})`,
                    img:``,
                    // https://cdn.discordapp.com/avatars/${contain_arr.at(-1)?.author_id}/${contain_arr.at(-1)?.avatar}.webp?size=80
                    iteration:Math.abs(contain_arr.length - (messages.length - u)),
                    total_results:(max_pages*50),
                    status:true
                });
            }
            if(messages.length < 50) break;
        }
        var unq_messages =  unqKey(contain_arr,'id');
        
        // getUsersInformations(unq_messages)

        var time_range = `${/[\d-]+/.exec(unq_messages?.[0]?.timestamp)?.[0]} to ${/[\d-]+/.exec(unq_messages?.at(-1)?.timestamp)?.[0]}`;
        downloadr(unq_messages,
            `${unq_messages.length} channel messages from ${guild_information?.name ? guild_information?.name+' (' : 'direct messages ('}${chanel_information?.name || channel_id}) - ${time_range}.json`);

        if(last_response_length == 50){
            await delay(970);
            contain_arr = [];
            updateDownloadBar({
                text:`attempting to retrieve the next ${(max_pages * 50)} messages in ${guild_information?.name ? guild_information?.name+' (' : 'direct messages ('}${chanel_information?.name || channel_id}) - refresh the tab to cancel.`,
                img:``,
                iteration:1,
                total_results:max_pages,
                status:true
            });
            await delay(10970);
            await loopThroughChannelMessages(channel_id,before);
        }else{
            updateDownloadBar({
                text:``,
                img:``,
                iteration:100,
                total_results:100,
                status:false
            });
        }
    }

    var contain_arr = [];
    var channel_id = /(?<=channels\/(@me|\d+)\/)\d+/.exec(window.location.href)?.[0];    
    var chanel_information = await getDiscordData({uri_path:`channels/${channel_id}`});

    await loopThroughChannelMessages(channel_id,'');



    var userinformations = [];
    async function getUsersInformations(messages){
        let user_ids = unqKey(messages,'author_id').map(r=> r.author_id);
        for(let i=0; i<user_ids.length; i++){
            let userinformation = await getDiscordData({uri_path:`users/${user_ids[i]}/profile?with_mutual_guilds=true`});
            if(userinformation?.mutual_guilds?.length){
                for(let u=0; u<userinformation?.mutual_guilds.length; u++){
                    let guild_info = await getGuildData(userinformation?.mutual_guilds[u].id);
                    userinformation.mutual_guilds[u] = guild_info;
                    await delay(rando(970)+555);
                }
                userinformations.push(userinformation);
            }else userinformations.push(userinformation)
        }
        downloadr(userinformations,`userinformations.json`);
    }
    // downloadr(channel_messages,`${channel_messages.length} channel messages from ${guild_information?.name ? guild_information?.name+' (' : 'direct messages ('}${chanel_information?.name || channel_id}).json`);

}   
scrapeCurrentDiscordChannel()
