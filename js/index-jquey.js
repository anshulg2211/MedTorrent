var jUser=false,jPass=false,jMob=false,OTP=0;
$(document).ready(function () {
    
    $("#username").blur(function () {
        var user = $(this).val();
        if(user == "")
            {
              $("#errUser").html("Can't be empty").addClass("not-ok");
                 jUser=false;
              return; 
            }
        if(user.length < 8)
            {
              $("#errUser").html("Min 8 characters required").addClass("not-ok");
                 jUser=false;
                return;
            }
        else if(user.length > 30)
            {
              $("#errUser").html("Max 30 characters allowed").addClass("not-ok");
                 jUser=false;
                return;
            }
        else{
              $("#errUser").html("");
              jUser=true;
           }
        $.getJSON("ajax-signup.php?user=" + user +"&pass=p&mobile=1", function (response) {
            if(response=="0")
            {
                $("#errUser").html("Already taken").addClass("not-ok");
                jUser=false;
            }    
        });
    });
    $("#password").blur(function () {
        var r=/(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[a-z]).*$/;
        var pass = $(this).val();
        if(pass == "")
            {
              $("#errPass").html("Can't be empty").addClass("not-ok");
                jPass=false;
              return; 
            }
        if(r.test(pass)==true)
            {
               $("#errPass").html("");
                jPass=true;
            }
        else if(pass.length < 8)
            {
               $("#errPass").html("Min 8 characters required").addClass("not-ok");
                jPass=false;
            }
        else{
               $("#errPass").html("Should contain both letters and numbers").addClass("not-ok");
            jPass=false;
            }
    });
    $("#mobile").blur(function () {
        var r = /^[6-9]{1}[0-9]{9}$/;
        var mob = $(this).val();
        if(mob == "")
            {
            $("#errMob").html("Can't be empty").addClass("not-ok");
                jMob=false;
            return; 
            }
        if (isNaN(mob)) {
            $("#errMob").html("Numeric values only").addClass("not-ok");
            jMob=false;
            return;
        }
        if (r.test(mob) == true)
            {
              $("#errMob").html("").removeClass("not-ok");
                jMob=true;
            }
        else 
            {
                $("#errMob").html("Invalid").addClass("not-ok");
                jMob=false;
                return;
            }
        $.getJSON("ajax-signup.php?user=a&pass=p&mobile="+mob, function (response) {
            if(response=="0")
                {
                   $("#errMob").html("Already taken").addClass("not-ok");
                    jMob=false;
                }
        });
          
    });
    $("#bttn").click(function () {
        if(jUser==false || jPass==false || jMob==false)
            {
                alert("Fill data");
                return;
            }
            
        var user = $("#username").val();
        var pass = $("#password").val();
        var mob = $("#mobile").val();
        $.getJSON("ajax-signup.php?user=" + user + "&pass=" + pass + "&mobile=" + mob, function (response) {
            if(response == "1")
                {
                    window.location = "user-profile-front.php";
                }
            
        });
    });
    $("#bttn_login").click(function () {
        var user = $("#user_login").val();
        var pass = $("#pass_login").val();
        if(user=="" || pass=="")
            {
                $("#login-status").html("Username or Password can't be empty").addClass("not-ok");
                return;
            }
        $.getJSON("json-login.php?user=" + user + "&pass=" + pass, function (response) {
            if (response == "1")
               window.location = "user-dash.php";
            else
                $("#login-status").html("Username or Password is incorrect").addClass("not-ok");
        });
    });
    $(".fa-eye").mousedown(function () {
        $(".fa-eye").removeClass("fa-eye").addClass("fa-eye-slash");
        $("#password").attr("type", "text");
        $("#pass_login").attr("type", "text");
    })
    $(".fa-eye").mouseup(function () {
        $(".fa-eye-slash").removeClass("fa-eye-slash").addClass("fa-eye");
        $("#password").attr("type", "password");
        $("#pass_login").attr("type", "password");
    })
    $("#getOtp").click(function(){ 
        var mob = $("#regMob").val();
        $("#sentOtp").html("OTP sent").addClass("ok");
        $.getJSON("generate-otp.php?regMob=" + mob, function (response) {  
               if(response == "0")
                   alert("Mobile No. not registered");
            else
                {
                    OTP = response;
                    alert(OTP);
                }
                
        });
    })
    $("#submitOTP").click(function(){
        var inpOtp = $("#otp").val();
        var mob = $("#regMob").val();
        if(inpOtp == OTP)
            {
                $('#forgotUser').modal('toggle');
                $('#showDetails').modal('show'); 
                $.getJSON("get-details-otp.php?mob="+mob,function(result){
                $("#userDet").html(result[0].username);
                $("#passDet").html(result[0].password);
                });
            }
        else
            alert("Incorrect OTP");
    });
});

