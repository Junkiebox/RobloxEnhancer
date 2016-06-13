$(window).load(function() {
    var success = false;
    Storage.Get("mysiggy", function(obj) {
        if ($('#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').val()) {
            $.growl.warning({
                message: "Found Text || Siggy Aborted"
            });
        } else {
            if (obj.mysiggy) {
                $('#sig').val("\n\n\n\n" + obj.mysiggy);
                $('#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').val("\n\n\n\n" + obj.mysiggy);
                $('.txtbox').val("\n\n\n\n" + obj.mysiggy);
                if (window.location.href.match(/\?ForumID/g)) {
                    $("#ctl00_cphRoblox_Createeditpost1_PostForm_NewPostSubject").focus();
                } else {
                    if (window.location.href.match(/AddPost.aspx/g)) {
                        $("#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody").focus();
                        $("#ctl00_cphRoblox_Createeditpost1_PostForm_PostBody").get(0).setSelectionRange(0, 0);
                    }
                }
            }
        }
        success = true
        console.log("Siggy Plugin Loaded");
    })
    return success
})
