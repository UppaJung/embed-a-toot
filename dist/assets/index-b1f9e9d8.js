var M=Object.defineProperty;var U=(n,e,t)=>e in n?M(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var o=(n,e,t)=>(U(n,typeof e!="symbol"?e+"":e,t),t),x=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var c=(n,e,t)=>(x(n,e,"read from private field"),t?t.call(n):e.get(n)),i=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)},h=(n,e,t,a)=>(x(n,e,"write to private field"),a?a.call(n,t):e.set(n,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const S=[],b=new Set;let C=!1;const $=()=>{if(!C)try{for(C=!0;b.size>0;){const[n]=[...b];n==null||n.compute()}}finally{C=!1}};var f,p,y,w;class k{constructor(){i(this,f,new Set);i(this,p,new Set);i(this,y,(...e)=>{for(const t of e)c(this,p).add(t)});o(this,"callBeforeGetValue",()=>{const[e]=S;e!=null&&c(this,y).call(this,e)});o(this,"callAfterSetChangesValue",(e,t)=>{for(const a of c(this,p))a.invalidate();c(this,w).call(this,e,t),$()});i(this,w,(e,t)=>{for(const a of c(this,f))try{a(e,t)}catch{}});o(this,"onChange",e=>c(this,f).add(e));o(this,"listen",e=>{this.onChange(e),e(this.value,this.value)})}}f=new WeakMap,p=new WeakMap,y=new WeakMap,w=new WeakMap;var u;class L extends k{constructor(t){super();i(this,u,void 0);h(this,u,t)}get value(){return this.callBeforeGetValue(),c(this,u)}set value(t){const a=c(this,u);a!==t&&(h(this,u,t),this.callAfterSetChangesValue(t,a))}}u=new WeakMap;var m,d,g;class v extends k{constructor(t,a=!1){super();i(this,m,void 0);i(this,d,!1);o(this,"compute",()=>{const t=c(this,m);S.unshift(this);let a;try{return h(this,m,a=c(this,g).call(this)),h(this,d,!0),a}finally{S.shift(),b.delete(this),c(this,d)&&a!==t&&this.callAfterSetChangesValue(a,t)}});i(this,g,void 0);h(this,g,t),a&&this.compute()}get valid(){return!c(this,d)}invalidate(){h(this,d,!1),b.add(this)}get value(){return this.callBeforeGetValue(),c(this,d)?c(this,m):this.compute()}}m=new WeakMap,d=new WeakMap,g=new WeakMap;const N=n=>{const{host:e,pathname:t}=new URL(n),a=t.split("/")[2]??"";return{host:e,status:a}},V=async(...n)=>{const e=await fetch(...n);if(!e.ok)throw new Error(e.statusText);return await e.json()},j=n=>{const{host:e,status:t}=typeof n=="string"?N(n):n;return V(`https://${e}/api/v1/statuses/${t}, {});`)},A=`<article class="fediverse-status">
	<header>
		<a href="{{authorLink}}" rel="external nofollow" title="view profile at @{{authorUserName}}@{{authorServer}}" class="authors-avatar-link">
			<picture class="authors-avatar">
				<source srcset="{{avatarUrl}}" media="(prefers-reduced-motion: no-preference)"/>
				<img src="{{avatarUrl}}" alt="@{{authorUserName}}@{{authorServer}} avatar" class="authors-avatar"/>
			</picture>
		</a>
		<div class="comment-author">
			<span class="comment-authors-display-name">{{authorName}}</span>
				<a href="{{authorLink}}" title="@{{authorUserName}}@{{authorServer}}" rel="external nofollow" class="comment-authors-fediverse-identity">
					<span class="at-symbol username-at-symbol">@</span>
					<span class="comment-authors-fediverse-username">{{authorUserName}}</span>
					<span class="at-symbol server-at-symbol">@</span><span class="comment-authors-fediverse-server">{{authorServer}}</span>
				</a>
		</div>
	</header>
	<main>{{contentHtml}}</main>
	<footer>
		<time datetime="{{dateTimeIso}}" class="comment-time">{{dateTimeText}}</time>
		<a href="{{favoritesLink}}" title="favourites reported by {{authorServer}}" class="counter-favourites">{{favoritesCount}}</a>
		<a href="{{reblogsLink}}" title="reblogs reported by {{authorServer}}" class="counter-reblogs">{{reblogsCount}}</a>
	</footer>
</article>
`,z=`.fediverse-status {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	max-width: 80vw;
}

/*
 Emoji in user display names and image content are converted to images,
 which should be rendered at the same size (height) as the content.
 Those are both 1rem high, so we limit the height of emoji to 1rem.
*/
.fediverse-status .emoji {
	max-height: 1rem;
}

.fediverse-status .fediverse-attachment {
	max-width: calc(80vw - 1rem);
}

/*
	Common traits of both the header and the footer of a status.
*/
.fediverse-status header, .fediverse-status footer {
	/* data placed in a row */
	display: flex;
	flex-direction: row;
	align-items: center;
	/* separated by small gaps */
	gap: .5rem;
	/* with padding on both sides */
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	/* and a background color common to headers and footers */
	background-color: rgba(196, 196, 255, 0.25);
	/* Take up full width minus padding left/right */
	width: calc(100% - 1rem);
}
/* Links within headers and footers should not be underlined */
.fediverse-status header a, .fediverse-status footer {
	text-decoration: none;
	box-shadow: none;
	justify-content: flex-start;
}

.fediverse-status footer {
	/* footer content is less critical, so in a smaller font */
	font-size: 0.75rem;
}

.fediverse-status main {
	/* background color less strong than header/footer */
	background-color: rgba(196, 196, 255, 0.125);
	/* pad left to align with header/footer content, but do not pad right (go to edge) */
	padding-left: 0.5rem;
	/* pad top and bottom */
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
}

/* use small margins for content */
.fediverse-status main p {
	margin: 0;
	margin-top: .25rem;
}
/* no need to separate the first paragraph from the non-existent ones above it */
.fediverse-status main p:first-child {
	margin-top: 0;
}

/*
	The avatar image representing the comment's author
*/
.fediverse-status header picture, .fediverse-status header img {
	/* restrict size by limiting height */
	max-height: 3rem;
}

.fediverse-status header .comment-author {
	/* put the display name above the fediverse id, with both formatted to the left margin */
	display: flex;
	flex-direction: column;
	align-items: start;
}


.fediverse-status .comment-authors-display-name {
	/* Boldface the author's display name to make it salient */
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}

.fediverse-status header .comment-authors-fediverse-identity {
	/* create a card-appearance with a gentle background color and rounded corners */
	background-color: rgba(128,128,128, 0.125);
	border-radius: 0.5rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
}

/* De-emphasize the parts of the author's identity other than their username */
.fediverse-status authors-fediverse-server, .fediverse-status .at-symbol {
	color: rgba(128,128,128, 0.75)
}

.fediverse-status footer .counter-favourites::before {
	content: "★";
	color: rgb(96 ,96 ,96 ,1);
	margin-inline-end: .25em;          
}

.fediverse-status footer .counter-reblogs::before {
	/* copied from Mastodon website */
	content: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='15'><path d='M4.97 3.16c-.1.03-.17.1-.22.18L.8 8.24c-.2.3.03.78.4.8H3.6v2.68c0 4.26-.55 3.62 3.66 3.62h7.66l-2.3-2.84c-.03-.02-.03-.04-.05-.06H7.27c-.44 0-.72-.3-.72-.72v-2.7h2.5c.37.03.63-.48.4-.77L5.5 3.35c-.12-.17-.34-.25-.53-.2zm12.16.43c-.55-.02-1.32.02-2.4.02H7.1l2.32 2.85.03.06h5.25c.42 0 .72.28.72.72v2.7h-2.5c-.36.02-.56.54-.3.8l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.26-.28 0-.83-.37-.8H18.4v-2.7c0-3.15.4-3.62-1.25-3.66z' fill='%23606984' stroke-width='0'/><path d='M7.78 19.66c-.24.02-.44.25-.44.5v2.46h-.06c-1.08 0-1.86-.03-2.4-.03-1.64 0-1.25.43-1.25 3.65v4.47c0 4.26-.56 3.62 3.65 3.62H8.5l-1.3-1.06c-.1-.08-.18-.2-.2-.3-.02-.17.06-.35.2-.45l1.33-1.1H7.28c-.44 0-.72-.3-.72-.7v-4.48c0-.44.28-.72.72-.72h.06v2.5c0 .38.54.63.82.38l4.9-3.93c.25-.18.25-.6 0-.78l-4.9-3.92c-.1-.1-.24-.14-.38-.12zm9.34 2.93c-.54-.02-1.3.02-2.4.02h-1.25l1.3 1.07c.1.07.18.2.2.33.02.16-.06.3-.2.4l-1.33 1.1h1.28c.42 0 .72.28.72.72v4.47c0 .42-.3.72-.72.72h-.1v-2.47c0-.3-.3-.53-.6-.47-.07 0-.14.05-.2.1l-4.9 3.93c-.26.18-.26.6 0 .78l4.9 3.92c.27.25.82 0 .8-.38v-2.5h.1c4.27 0 3.65.67 3.65-3.62v-4.47c0-3.15.4-3.62-1.25-3.66zM10.34 38.66c-.24.02-.44.25-.43.5v2.47H7.3c-1.08 0-1.86-.04-2.4-.04-1.64 0-1.25.43-1.25 3.65v4.47c0 3.66-.23 3.7 2.34 3.66l-1.34-1.1c-.1-.08-.18-.2-.2-.3 0-.17.07-.35.2-.45l1.96-1.6c-.03-.06-.04-.13-.04-.2v-4.48c0-.44.28-.72.72-.72H9.9v2.5c0 .36.5.6.8.38l4.93-3.93c.24-.18.24-.6 0-.78l-4.94-3.92c-.1-.08-.23-.13-.36-.12zm5.63 2.93l1.34 1.1c.1.07.18.2.2.33.02.16-.03.3-.16.4l-1.96 1.6c.02.07.06.13.06.22v4.47c0 .42-.3.72-.72.72h-2.66v-2.47c0-.3-.3-.53-.6-.47-.06.02-.12.05-.18.1l-4.94 3.93c-.24.18-.24.6 0 .78l4.94 3.92c.28.22.78-.02.78-.38v-2.5h2.66c4.27 0 3.65.67 3.65-3.62v-4.47c0-3.66.34-3.7-2.4-3.66zM13.06 57.66c-.23.03-.4.26-.4.5v2.47H7.28c-1.08 0-1.86-.04-2.4-.04-1.64 0-1.25.43-1.25 3.65v4.87l2.93-2.37v-2.5c0-.44.28-.72.72-.72h5.38v2.5c0 .36.5.6.78.38l4.94-3.93c.24-.18.24-.6 0-.78l-4.94-3.92c-.1-.1-.24-.14-.38-.12zm5.3 6.15l-2.92 2.4v2.52c0 .42-.3.72-.72.72h-5.4v-2.47c0-.3-.32-.53-.6-.47-.07.02-.13.05-.2.1L3.6 70.52c-.25.18-.25.6 0 .78l4.93 3.92c.28.22.78-.02.78-.38v-2.5h5.42c4.27 0 3.65.67 3.65-3.62v-4.47-.44zM19.25 78.8c-.1.03-.2.1-.28.17l-.9.9c-.44-.3-1.36-.25-3.35-.25H7.28c-1.08 0-1.86-.03-2.4-.03-1.64 0-1.25.43-1.25 3.65v.7l2.93.3v-1c0-.44.28-.72.72-.72h7.44c.2 0 .37.08.5.2l-1.8 1.8c-.25.26-.08.76.27.8l6.27.7c.28.03.56-.25.53-.53l-.7-6.25c0-.27-.3-.48-.55-.44zm-17.2 6.1c-.2.07-.36.3-.33.54l.7 6.25c.02.36.58.55.83.27l.8-.8c.02 0 .04-.02.04 0 .46.24 1.37.17 3.18.17h7.44c4.27 0 3.65.67 3.65-3.62v-.75l-2.93-.3v1.05c0 .42-.3.72-.72.72H7.28c-.15 0-.3-.03-.4-.1L8.8 86.4c.3-.24.1-.8-.27-.84l-6.28-.65h-.2zM4.88 98.6c-1.33 0-1.34.48-1.3 2.3l1.14-1.37c.08-.1.22-.17.34-.2.16 0 .34.08.44.2l1.66 2.03c.04 0 .07-.03.12-.03h7.44c.34 0 .57.2.65.5h-2.43c-.34.05-.53.52-.3.78l3.92 4.95c.18.24.6.24.78 0l3.94-4.94c.22-.27-.02-.76-.37-.77H18.4c.02-3.9.6-3.4-3.66-3.4H7.28c-1.08 0-1.86-.04-2.4-.04zm.15 2.46c-.1.03-.2.1-.28.2l-3.94 4.9c-.2.28.03.77.4.78H3.6c-.02 3.94-.45 3.4 3.66 3.4h7.44c3.65 0 3.74.3 3.7-2.25l-1.1 1.34c-.1.1-.2.17-.32.2-.16 0-.34-.08-.44-.2l-1.65-2.03c-.06.02-.1.04-.18.04H7.28c-.35 0-.57-.2-.66-.5h2.44c.37 0 .63-.5.4-.78l-3.96-4.9c-.1-.15-.3-.23-.47-.2zM4.88 117.6c-1.16 0-1.3.3-1.3 1.56l1.14-1.38c.08-.1.22-.14.34-.16.16 0 .34.04.44.16l2.22 2.75h7c.42 0 .72.28.72.72v.53h-2.6c-.3.1-.43.54-.2.78l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.22-.28-.02-.77-.37-.78H18.4v-.53c0-4.2.72-3.63-3.66-3.63H7.28c-1.08 0-1.86-.03-2.4-.03zm.1 1.74c-.1.03-.17.1-.23.16L.8 124.44c-.2.28.03.77.4.78H3.6v.5c0 4.26-.55 3.62 3.66 3.62h7.44c1.03 0 1.74.02 2.28 0-.16.02-.34-.03-.44-.15l-2.22-2.76H7.28c-.44 0-.72-.3-.72-.72v-.5h2.5c.37.02.63-.5.4-.78L5.5 119.5c-.12-.15-.34-.22-.53-.16zm12.02 10c1.2-.02 1.4-.25 1.4-1.53l-1.1 1.36c-.07.1-.17.17-.3.18zM5.94 136.6l2.37 2.93h6.42c.42 0 .72.28.72.72v1.25h-2.6c-.3.1-.43.54-.2.78l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.22-.28-.02-.77-.37-.78H18.4v-1.25c0-4.2.72-3.63-3.66-3.63H7.28c-.6 0-.92-.02-1.34-.03zm-1.72.06c-.4.08-.54.3-.6.75l.6-.74zm.84.93c-.12 0-.24.08-.3.18l-3.95 4.9c-.24.3 0 .83.4.82H3.6v1.22c0 4.26-.55 3.62 3.66 3.62h7.44c.63 0 .97.02 1.4.03l-2.37-2.93H7.28c-.44 0-.72-.3-.72-.72v-1.22h2.5c.4.04.67-.53.4-.8l-3.96-4.92c-.1-.13-.27-.2-.44-.2zm13.28 10.03l-.56.7c.36-.07.5-.3.56-.7zM17.13 155.6c-.55-.02-1.32.03-2.4.03h-8.2l2.38 2.9h5.82c.42 0 .72.28.72.72v1.97H12.9c-.32.06-.48.52-.28.78l3.94 4.94c.2.23.6.22.78-.03l3.94-4.9c.22-.28-.02-.77-.37-.78H18.4v-1.97c0-3.15.4-3.62-1.25-3.66zm-12.1.28c-.1.02-.2.1-.28.18l-3.94 4.9c-.2.3.03.78.4.8H3.6v1.96c0 4.26-.55 3.62 3.66 3.62h8.24l-2.36-2.9H7.28c-.44 0-.72-.3-.72-.72v-1.97h2.5c.37.02.63-.5.4-.78l-3.96-4.9c-.1-.15-.3-.22-.47-.2zM5.13 174.5c-.15 0-.3.07-.38.2L.8 179.6c-.24.27 0 .82.4.8H3.6v2.32c0 4.26-.55 3.62 3.66 3.62h7.94l-2.35-2.9h-5.6c-.43 0-.7-.3-.7-.72v-2.3h2.5c.38.03.66-.54.4-.83l-3.97-4.9c-.1-.13-.23-.2-.38-.2zm12 .1c-.55-.02-1.32.03-2.4.03H6.83l2.35 2.9h5.52c.42 0 .72.28.72.72v2.34h-2.6c-.3.1-.43.53-.2.78l3.92 4.9c.18.24.6.24.78 0l3.94-4.9c.22-.3-.02-.78-.37-.8H18.4v-2.33c0-3.15.4-3.62-1.25-3.66zM4.97 193.16c-.1.03-.17.1-.22.18l-3.94 4.9c-.2.3.03.78.4.8H3.6v2.68c0 4.26-.55 3.62 3.66 3.62h7.66l-2.3-2.84c-.03-.02-.03-.04-.05-.06H7.27c-.44 0-.72-.3-.72-.72v-2.7h2.5c.37.03.63-.48.4-.77l-3.96-4.9c-.12-.17-.34-.25-.53-.2zm12.16.43c-.55-.02-1.32.03-2.4.03H7.1l2.32 2.84.03.06h5.25c.42 0 .72.28.72.72v2.7h-2.5c-.36.02-.56.54-.3.8l3.92 4.9c.18.25.6.25.78 0l3.94-4.9c.26-.28 0-.83-.37-.8H18.4v-2.7c0-3.15.4-3.62-1.25-3.66z' fill='%238C8DFF' stroke-width='0'/></svg>");
	margin-inline-end: .25em;     
}
`,T=(n,e)=>{let t=n;return e.forEach(a=>{const s=document.createElement("source");s.setAttribute("srcset",a.url),s.setAttribute("media","(prefers-reduced-motion: no-preference)");const r=document.createElement("img");r.classList.add("emoji"),r.setAttribute("src",a.static_url),r.setAttribute("alt",`:${a.shortcode}:`),r.setAttribute("title",`:${a.shortcode}:`);const l=document.createElement("picture");l.classList.add("emoji"),l.appendChild(s),l.append(r),t=t.replace(`:${a.shortcode}:`,l.outerHTML)}),t},E=["tootUrlTextInput","embeddedCssContainer","embeddedHtmlContainer","embeddedTootContainer","embeddedScriptContainer","tootScript","tootStyle"],D=(n,e)=>{let t=n;return Object.entries(e).forEach(([a,s])=>{t=t.replaceAll(`{{${a}}}`,s)}),t},H=n=>{n.addEventListener("click",()=>{n.setSelectionRange(0,-1);const e=new Blob([n.value],{type:"text/plain"}),t=[new ClipboardItem({"text/plain":e})];navigator.clipboard.write(t)})};class _{constructor(){o(this,"elements");o(this,"statusCache",new Map);o(this,"observableStatusUrl");o(this,"observableStatus",new L(void 0));o(this,"onStatusUrlChange",async(e=this.elements.tootUrlTextInput.value)=>{if(this.observableStatusUrl.value=e,!this.statusCache.has(e)&&e.length>0)try{this.statusCache.set(e,void 0);const t=await j(e);this.statusCache.set(e,t)}catch{}this.observableStatus.value=this.statusCache.get(this.observableStatusUrl.value)});o(this,"html",new v(()=>{const e=this.observableStatus.value;return e==null?"":D(A,{authorLink:`${e.account.url}`,authorUserName:e.account.username,authorServer:new URL(e.account.url).hostname,authorName:T(e.account.display_name,e.account.emojis),avatarUrl:`${e.account.avatar}`,contentHtml:T(e.content,e.emojis)+this.previews.value,dateTimeIso:new Date(e.created_at).toISOString(),dateTimeText:new Date(e.created_at).toLocaleString(void 0,{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}),favoritesLink:`${e.url}/favourites`,reblogsLink:`${e.url}/reblogs`,favoritesCount:`${e.favourites_count}`,reblogsCount:`${e.reblogs_count}`})}));o(this,"mediaAttachments",new v(()=>{var e;return((e=this.observableStatus.value)==null?void 0:e.media_attachments)??[]}));o(this,"hasVideos",new v(()=>this.mediaAttachments.value.find(e=>e.type==="gifv"||e.type==="video")!=null));o(this,"previews",new v(()=>{const e=this.observableStatus.value;return console.log("media attachments",e==null?void 0:e.media_attachments),e==null?"":e.media_attachments.map(a=>{switch(a.type){case"image":return`<img class="fediverse-attachment" src="${a.url}" />`;case"gifv":return`<video class="fediverse-attachment" role="application" src="${a.url}" playsinline autoplay loop></video>`;case"video":return`<video class="fediverse-attachment" role="application" controls src="${a.url}" playsinline autoplay loop></video>`;case"audio":return""}}).join("")}));o(this,"script",new v(()=>this.hasVideos?`document.addEventListener('DOMContentLoaded', () => {
			document.querySelectorAll(".fediverse-status video").forEach( (video) => { video.play().catch( () => {} ) });
		});
		`:""));this.elements=E.reduce((e,t)=>(e[t]=document.getElementById(t)??(()=>{throw new Error(`Missing element with id ${t}`)})(),e),{}),this.elements.tootUrlTextInput.addEventListener("change",()=>this.onStatusUrlChange()),this.elements.tootUrlTextInput.addEventListener("paste",e=>{var t;return this.onStatusUrlChange((t=e.clipboardData)==null?void 0:t.getData("text"))}),this.observableStatusUrl=new L(""),this.elements.embeddedCssContainer.textContent=z,this.script.listen(e=>{this.elements.embeddedScriptContainer.innerText=e,this.elements.tootScript.replaceChildren(document.createTextNode(e))}),this.html.listen(e=>{this.elements.embeddedTootContainer.innerHTML=e,this.elements.embeddedHtmlContainer.textContent=e,this.elements.tootStyle.replaceChildren(document.createTextNode(z)),document.querySelectorAll(".fediverse-status video").forEach(t=>{t.play().catch(a=>{console.log("could not play",a)})})}),this.onStatusUrlChange(),H(this.elements.embeddedHtmlContainer),H(this.elements.embeddedCssContainer),H(this.elements.embeddedScriptContainer)}}document.addEventListener("DOMContentLoaded",()=>{new _});
