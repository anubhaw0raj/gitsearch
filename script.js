//https://api.github.com/users/user_name/repos
//
const user_img = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const followers_ = document.querySelector(".followers_ span");
const follow_ = document.querySelector(".follow_ span");
const repo_details = document.querySelector(".repo_details");
const btn_submit = document.querySelector(".btn_submit");

let user_name = '';

function inputFunction(){
    let input_user = document.querySelector(".input_user").value.trim();

    if (input_user.length <= 0 ){
        alert("Please Enter github user Name");
        document.querySelector(".input_user").value = '';
        document.querySelector(".input_user").focus();
        return false;
    }else {
        user_name = input_user.split("").join("");

        fetchUser();

        document.querySelector(".input_user").value = '';
        document.querySelector(".input_user").focus();
    }
};

btn_submit.addEventListener("click",function (){
    inputFunction()
});

document.querySelector(".input_user").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        inputFunction();
    }
});

function fetchUser() {
    fetch(`https://api.github.com/users/${user_name}`)
        .then(response => response.json())
        .then(function(data) {
            //user info
            console.log(data);
            if(data.message === "Not Found"){
                alert("User Not Found");
                return false;
            }else{
                user_img.innerHTML = `<img src="${data.avatar_url}">`;
                userName.innerHTML = data.login;
                followers_.innerHTML = data.followers;
                follow_.innerHTML = data.following;
            }
        })

        //repo fetch 
        fetch(`https://api.github.com/users/${user_name}/repos`)
        .then(response => response.json())
        .then(function(repo_data) {
            console.log(repo_data);
            //user with no repo
            if(repo_data.length <= 0){
                repo_details.innerHTML = `
                
                <div class="item_">
                        <div class="repo_name">No Repo Found</div>
                </div>
                
                `
            }else {
                //user name and repo both not found 
                if(repo_data.message === "Not Found"){
                    repo_details.innerHTML = `
                
                        <div class="item_">
                            <div class="repo_name">Repo Name</div>
                            <div class="repo_details_">
                                <div class="info_ star">
                                    <i class="fa fa-star-o"></i>-/-
                                </div>
                                <div class="info_ fork">
                                    <p><i class="fa fa-code-fork"></i>-/-</p>
                                </div>
                                <div class="info_ size">
                                    <p><i class="fa fa-file"></i>-/-kb</p>
                                </div>
                            </div>
                        </div>
                
                    `
                    user_img.innerHTML = `<img src="images/github_logo.png">`;
                    userName.innerHTML = `User Name`;
                    followers_.innerHTML = "-/-";
                    follow_.innerHTML = "-/-";
                }else {
                    //Found
                    let repo_Data = repo_data.map(item => {
                        console.log(item);
                        return(
                            `
                                <div class="item_">
                                    <div class="repo_name">${item.name}</div>
                                    <div class="repo_details_">
                                        <div class="info_ star">
                                            <i class="fa fa-star-o"></i>
                                            ${item.watchers}
                                        </div>
                                        <div class="info_ fork">
                                            <p><i class="fa fa-code-fork"></i>
                                            ${item.forks}
                                            </p>
                                        </div>
                                        <div class="info_ size">
                                            <p><i class="fa fa-file"></i>
                                            ${item.size}kb
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            `
                        );
                    })
                    repo_details.innerHTML = repo_Data.slice(0,repo_data.length).join("");
                }
            }
        })
}