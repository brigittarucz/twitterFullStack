async function createTweet() {

    let connectionGetSession = await fetch(
        'get-session.php', {
            "method": "GET"
        }
    )

    let sResponseSession = await connectionGetSession.text();

    var data = new FormData(document.querySelector('#formTweet'));
    data.set(sResponseSession, 'userId');

    let connection = await fetch(
        'api/api-create-tweet.php', 
        {
            "method": "POST",
            "body": data
        }
    )

    let sResponse = await connection.text();
    console.log(sResponse);

}

function changeView() {
    var sRoute = event.target.getAttribute("href");
    if (sRoute != null) {
        sRoute = sRoute.slice(1, sRoute.length);

        document.querySelectorAll(".view").forEach(domElement => {
            domElement.style.display = "none";
        })

        var previouslyClicked = document.querySelector("a.active");
        if (previouslyClicked !== event.target) {

            event.target.classList.add("active");
            event.target.querySelector('svg').classList.add("active");

            previouslyClicked.classList.remove("active");
            previouslyClicked.querySelector("svg").classList.remove("active");

        }

        if (document.querySelector("#middle-" + sRoute) !== null) {
            document.querySelector("#middle-" + sRoute).style.display = "block";
        }
    }
}

function closeModal() {
    if (event.target.parentElement.getAttribute("data-queryElement") != null) {
        document.querySelector(event.target.parentElement.getAttribute("data-queryElement")).style.display = "none";
    }
}

function openModal() {
    document.querySelector(event.target.getAttribute("data-queryElement")).style.display = "block";
}

function closePopup() {
    if (event.target.nodeName != 'A') {
        document.querySelector(event.target.getAttribute("data-queryElement")).style.display = "none";
    }
}

function openPopup() {

    // ev.target = path / a / svg

    // Dynamically generated
    if (event.target.getAttribute("data-querypopup") != null) {
        let selector = event.target.getAttribute("data-querypopup");
        document.querySelector(selector).style.display = "block";
        selector = selector.slice(1, selector.length);
        if (event.target.getAttribute("data-queryhidden")) {
            document.querySelector("." + selector + "_content .hide-tweet").textContent = "Unhide";
        }
        document.querySelector("." + selector + "_content").style.top = event.target.getBoundingClientRect().top - 135 + "px";
        document.querySelector("." + selector + "_content").setAttribute("data-postTweetId", event.target.getAttribute("data-tweetid"));
    }

    // Statically generated
    if (event.target.getAttribute("data-queryElement") != null) {
        document.querySelector(event.target.getAttribute("data-queryElement")).style.display = "block";
    }
}

(async function () {

    // TODO: get session id

    let connectionGetSession = await fetch(
        'get-session.php', {
            "method": "GET"
        }
    )

    let sResponseSession = await connectionGetSession.text();

    // TODO: get user's tweets

    let connectionGetTweets = await fetch(
        'api/api-get-tweets.php?id=' + sResponseSession, {
            "method": "GET"
        }
    )

    let sTweets = await connectionGetTweets.text();
    let jTweets = JSON.parse(sTweets);


    jTweets.forEach(jTweet => {
        let tweetBlueprint = `
        <article class="post-article" data-tweetId="${jTweet['tweetId']}">
        <div>
        <img src="media/icon.jpg" alt="">
        </div>
        <div>
        <h5>${jTweet['postedBy']} <span class="post-following">
            <svg viewBox="0 0 24 24">
                <g>
                <path
                    d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z">
                </path>
                </g>
            </svg></span> <span class="post-at">${jTweet['postedByAt']}</span> <span class="post-time">&#8226; ${jTweet['tweetDate']}</span> <a
            href="/" ` + (jTweet['hidden'] != 0 ? 'style="transform: rotate(90deg);"' : '') + ` data-tweetId="${jTweet['tweetId']}" onclick="openPopup(); return false;" data-queryhidden="${jTweet['hidden']}" data-querypopup="#popup-post" class="post-action"> <svg data-queryhidden="${jTweet['hidden']}" data-tweetId="${jTweet['tweetId']}" onclick="openPopup(); return false;" data-querypopup="#popup-post" viewBox="0 0 24 24"
                class="r-4qtqp9 r-yyyyoo r-ip8ujx r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-27tl0q">
                <g>
                <path data-queryhidden="${jTweet['hidden']}" data-tweetId="${jTweet['tweetId']}" onclick="openPopup(); return false;" data-querypopup="#popup-post"
                    d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z">
                </path>
                </g>
            </svg> </a></h5>
        </div>
        <div style="display:` + (jTweet['hidden'] == 0 ? 'block' : 'none') + `;">
        <p>${jTweet['tweetBody']}` + ` ` + (jTweet['postTagAt'] != 0 ? `<a href="" class="post-tag">${jTweet['postTagAt']}</a>` : '') + `</p>
        </div>
        <div class="post-article_link" style="display:` + (jTweet['hidden'] == 0 ? 'block' : 'none') + `;">
        <img src="media/link.jpg" alt="">
        <p class="title-link">Repeat prescriptions—does the global economy need a new diagnosis?</p>
        <p class="description-link">Our weekly podcast on markets, the economy and business</p>
        <a href="/" class="source-link"><span class="source-icon"><svg viewBox="0 0 24 24"
                class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                <g>
                <path
                    d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z">
                </path>
                <path
                    d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z">
                </path>
                </g>
            </svg></span>entrepreneur.com</a>
        </div> 
        <!-- <div class="post-article_media">
        <img src="media/link.jpg" alt="">
        </div> -->
        <div style="margin: 1rem 0; display:` + (jTweet['hidden'] == 0 ? 'flex' : 'none') + `;">
        <a href="/">
            <svg viewBox="0 0 24 24"
            class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
            <g>
                <path
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                </path>
            </g>
            </svg>
            9
        </a>
        <a href="/">
            <svg viewBox="0 0 24 24"
            class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
            <g>
                <path
                d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                </path>
            </g>
            </svg>
            5
        </a>
        <a href="/">
            <svg viewBox="0 0 24 24"
            class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
            <g>
                <path
                d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                </path>
            </g>
            </svg>
            30
        </a>
        <a href="/">
            <svg viewBox="0 0 24 24"
            class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
            <g>
                <path
                d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z">
                </path>
                <path
                d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z">
                </path>
            </g>
            </svg>
        </a>
        </div>
    </article>
    `;
        document.querySelector("#middle_posts-section").insertAdjacentHTML('afterbegin', tweetBlueprint);
    })

    jTweets.forEach(jTweet => {
        let retweetBlueprint = `
        <div class="retweet" data-tweetId="${jTweet['tweetId']}">
                <div>
                  <svg viewBox="0 0 24 24"
                    class="r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1xzupcd">
                    <g>
                      <path
                        d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4c0-2.178-1.772-3.95-3.95-3.95h-5.2c-.663 0-1.2.538-1.2 1.2s.537 1.2 1.2 1.2h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326c-.47-.47-1.23-.47-1.697 0s-.47 1.23 0 1.697l3.374 3.375c.234.233.542.35.85.35s.613-.116.848-.35l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326c.234.235.542.352.848.352s.614-.117.85-.352c.468-.47.468-1.23 0-1.697L5.46 3.8c-.47-.468-1.23-.468-1.697 0L.388 7.177c-.47.47-.47 1.23 0 1.697s1.23.47 1.697 0L3.41 7.547v9.403c0 2.178 1.773 3.95 3.95 3.95h5.2c.664 0 1.2-.538 1.2-1.2s-.535-1.2-1.198-1.2z">
                      </path>
                    </g>
                  </svg>
                  <p class="text-sm">
                    You Retweeted
                  </p>
                </div>
                <article class="post-article">
                  <div>
                    <img src="media/icon.jpg" alt="">
                  </div>
                  <div>
                    <h5>${jTweet['postedBy']}<span class="post-at">${jTweet['postedByAt']}</span> <span class="post-time">&#8226; ${jTweet['tweetDate']}</span> <a href="/"
                    ` + (jTweet['hidden'] != 0 ? 'style="transform: rotate(90deg);"' : '') + ` onclick="openPopup(); return false;" data-queryhidden="${jTweet['hidden']}" data-tweetId="${jTweet['tweetId']}" data-querypopup="#popup-post" class="post-action" > <svg data-queryhidden="${jTweet['hidden']}" data-tweetId="${jTweet['tweetId']}" data-querypopup="#popup-post" onclick="openPopup(); return false;" viewBox="0 0 24 24"
                          class="r-4qtqp9 r-yyyyoo r-ip8ujx r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-27tl0q">
                          <g>
                            <path data-queryhidden="${jTweet['hidden']}" data-tweetId="${jTweet['tweetId']}" onclick="openPopup(); return false;" data-querypopup="#popup-post"
                              d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z">
                            </path>
                          </g>
                        </svg> </a></h5>
                  </div>
                  <div style="display:` + (jTweet['hidden'] == 0 ? 'block' : 'none') + `;">
                  <p>${jTweet['tweetBody']}` + ` ` + (jTweet['postTagAt'] != 0 ? `<a href="" class="post-tag">${jTweet['postTagAt']}</a>` : '') + `</p>
                  </div>
                  <div class="post-article_link" style="display:` + (jTweet['hidden'] == 0 ? 'block' : 'none') + `;">
                    <img src="media/link.jpg" alt="">
                    <p class="title-link">Repeat prescriptions—does the global economy need a new diagnosis?</p>
                    <p class="description-link">Our weekly podcast on markets, the economy and business</p>
                    <a href="/" class="source-link"><span class="source-icon"><svg viewBox="0 0 24 24"
                          class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                          <g>
                            <path
                              d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z">
                            </path>
                            <path
                              d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z">
                            </path>
                          </g>
                        </svg></span>entrepreneur.com</a>
                  </div>
                  <!-- <div class="post-article_media">
                    <img src="media/link.jpg" alt="">
                  </div> -->
                  <div style="display:` + (jTweet['hidden'] == 0 ? 'flex' : 'none') + `;">
                    <a href="/">
                      <svg viewBox="0 0 24 24"
                        class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                        <g>
                          <path
                            d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                          </path>
                        </g>
                      </svg>
                      9
                    </a>
                    <a href="/">
                      <svg viewBox="0 0 24 24"
                        class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                        <g>
                          <path
                            d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                          </path>
                        </g>
                      </svg>
                      5
                    </a>
                    <a href="/">
                      <svg viewBox="0 0 24 24"
                        class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                        <g>
                          <path
                            d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z">
                          </path>
                        </g>
                      </svg>
                      30
                    </a>
                    <a href="/">
                      <svg viewBox="0 0 24 24"
                        class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                        <g>
                          <path
                            d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z">
                          </path>
                          <path
                            d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z">
                          </path>
                        </g>
                      </svg>
                    </a>
                  </div>
                </article>
              </div>`;

        document.querySelector('#middle_action-tweets').insertAdjacentHTML('afterbegin', retweetBlueprint);
    })


    // let connectionGetTweets = await fetch(
    //     'https://api.urlmeta.org/?url=https://moin.im',
    //     {
    //         method: "GET",
    //         mode: "cors",
    //         headers: {
    //             'Authorization': 'Basic ' +  btoa("bridget.breakthrough@yahoo.com:WnmhdPbs0aJvK4f8G1K9"),
    //         }
    //     }
    // )


})();

