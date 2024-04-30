(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=l(o);fetch(o.href,d)}})();let f;const v=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(v)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function L(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:S};function E(e,t,l){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const i=e.random||(e.rng||C)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=i[o];return t}return L(i)}class A{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"All",Completed:"Completed",Pending:"Pending"},s={todos:[],filter:a.All},P=()=>{T()},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(s))},k=e=>{if(!e)throw new Error("Description is required.");s.todos.push(new A(e)),g()},I=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},U=e=>{s.todos=s.todos.filter(t=>t.id!==e),g()},x=()=>{s.todos=s.todos.filter(e=>!e.done),g()},O=(e=a.All)=>{s.filter=e,g()},q=()=>s.filter,D=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},c={addTodo:k,deleteCompleted:x,deleteTodo:U,getCurrentFilter:q,getTodos:D,initStore:P,loadStore:T,setFilter:O,toggleTodo:I},F=`<section class="todoapp">
    <header class="header">
        <h1>Todo - app</h1>
        <input id="new-todo-input" class="new-todo" placeholder="Create a new task" autofocus>
    </header>

    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pending</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="filtro" class="selected" href="#/">All</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendings</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completed</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Clear completed</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`,M=e=>{if(!e)throw new Error("A TODO object is required");const t=`
    <div class="view">
        <input class="toggle" type="checkbox" ${e.done?"checked":""}>
        <label>${e.description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`,l=document.createElement("li");return l.innerHTML=t,l.setAttribute("data-id",e.id),e.done&&l.classList.add("completed"),l};let m;const H=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Element ${m} not found.`);m.innerHTML="",t.forEach(l=>{m.append(M(l))})};let y;const N=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found.`);y.innerHTML=c.getTodos(a.Pending).length},h={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompletedBtn:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const r=c.getTodos(c.getCurrentFilter());H(h.TodoList,r),l()},l=()=>{N(h.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=F,document.querySelector(e).append(r),t()})();const i=document.querySelector(h.NewTodoInput),o=document.querySelector(h.TodoList),d=document.querySelector(h.ClearCompletedBtn),u=document.querySelectorAll(h.TodoFilters);i.addEventListener("keyup",r=>{r.keyCode===13&&(r.target.value.trim().length<=0||(c.addTodo(r.target.value),t(),r.target.value=""))}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{if(!r.target.classList.contains("destroy"))return;const p=r.target.closest("[data-id]");c.deleteTodo(p.getAttribute("data-id")),t()}),d.addEventListener("click",()=>{c.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(w=>w.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"All":c.setFilter(a.All);break;case"Pendings":c.setFilter(a.Pending);break;case"Completed":c.setFilter(a.Completed);break}t()})})};c.initStore();V("#app");
