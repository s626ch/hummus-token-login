// ==UserScript==
// @name         hummus token login
// @namespace    http://liloandstit.ch/
// @version      2024-01-29
// @description  userscript that blends into hummus' login screen and allows you to easily swap accounts
// @author       s626ch
// @match        https://hummus.sys42.net/logi*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sys42.net
// @grant        GM_addStyle
// ==/UserScript==

let token;
var elem = document.createElement ('div');
elem.innerHTML = `
<div class="auth-form form shit">
    <h1>Pick an account.</h1>
    <div class="control-group">
        <label for="accountDropdown">Account</label>
        <select id="accountDropdown" name="Accounts">
            <option value="" disabled>Pick an account.</option>
<!-- IF YOU ARE MODIFYING THE SCRIPT THIS IS THE PART YOU WANT TO LOOK AT LOOK HERE LOOK HERE LOOK HERE LOOK HERE LOOK HERE LOOK HERE LOOK -->
<!-- HERE'S HOW YOU ADD AN ACCOUNT: LIKE THIS: -->
<!--
            <option value="TOKEN.HERE">Name</option>
-->
        // add accounts under this line --------------------

        </select>
    </div>
    <button id="tokenLogin" class="btn btn-primary fuck">Login</button>
</div>`;
try {
    document.querySelector("#app-mount > div > div > div.auth-center > div.auth-inner").appendChild(elem);
} catch(error) {
    console.log("fuck, trying route 2");
    document.querySelector("#app-mount > div > div.auth-wrap-background.visible > div:nth-child(5) > div")
} finally {
    console.log("if it added to the page, cool! if it didn't, fuck!");
}
document.getElementById ("tokenLogin").addEventListener (
    "click", loginFunc, false
);
function loginFunc(Event) {
    token = document.querySelector("#accountDropdown").value;
    document.querySelector("#tokenLogin").classList.add("load");
    setInterval(() => {
        document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`
    }, 100);
    setTimeout(() => {
        location.reload();
    }, 2500);
}
GM_addStyle ( `
div.auth-form {padding: 30px;border-radius: 0;background: 0 0;background: rgba(40,43,48,.75);min-width: 340px;width: auto;}
div.auth-form h1 {color: #fff;text-align: center;text-transform: uppercase;font-weight: 700;font-size: 18px;margin: 0 0 30px;}
/*#accountDropdown {background: 0 0;border-bottom-color: hsla(0,0%,100%,.1);color: #fff;font-size: 16px;font-weight: 400;border: none;outline: 0;border-bottom: 1px solid #f0f0f0;margin-bottom: 1px;width: 100%;resize: none;margin-top: 18px;*/}
.form .btn-primary:hover {background-color: #697ec4;}
div.auth-form .btn-primary {width: 100%;margin: 70px 0 0;line-height: 58px;padding: 0;display: inline-block;text-align: center;text-decoration: none;}
select {font-family: Whitney,Helvetica Neue,Helvetica,Arial,sans-serif;}
#accountDropdown:focus {border-bottom-color: #fff;border-bottom: 2px solid #7289da;margin-bottom: 0;}
#accountDropdown {transition:none;border-radius:0;background: 0 0;color: #fff;font-size: 16px;font-weight: 400;border: none;outline: 0;border-bottom: 1px solid hsla(0,0%,100%,.1);margin-bottom: 1px;width: 100%;resize: none;margin-top: 18px;line-height: 34px;padding-block-end: 1px;padding-block-start: 1px;padding-bottom: 1px;padding-inline-end: 2px;padding-inline-start: 2px;padding-left: 2px;padding-right: 2px;padding-top: 1px;}
.shit{height:calc(100% - 60px);}
.fuck{position:absolute!important;bottom:52px!important;width:340px!important;}
iframe{display:none;}
.load{cursor:wait!important;}
` );
