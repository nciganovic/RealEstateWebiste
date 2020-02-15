$(document).ready(function(){
    console.log("main.js");

    $(".btn").click(function(){
        console.log("Btn click");

        /* check name */
        var name = $("[name='Name']").val();
        var regName = /^[A-z][a-z]{1,15}(\s[A-z][a-z]{1,15}){0,3}$/;
        var isNameValid = regName.test(name);
        
        var errors = [];

        if(!isNameValid){
            errors.push('name');
        }

        /* check email */
        var email = $("[name='Email']").val();
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isEmailValid = regEmail.test(email);

        if(!isEmailValid){
            errors.push('email');
        }

        /* check subject */
        var subject = $("[name='Subject']").val();
        console.log(subject);
        var regSubject = /^[a-zA-Z0-9_.-\s]+$/;
        var isSpecCharFound = regSubject.test(subject);
        console.log('Subject', subject, 'is', isSpecCharFound);
        console.log(subject.length)
        if(!isSpecCharFound || subject.length < 5 || subject.length > 50){
            errors.push('subject');
        }
        console.log(errors);

        /* check message */ 
        var message = $("[name='Message']").val();
        var regMessage = /^[a-zA-Z0-9_.-\s]+$/;
        var isSpecCharFound2 = regMessage.test(message);
        
        if(!isSpecCharFound2 || message.length < 20 || message.length > 300){
            errors.push('message');
            console.log('Message failed!');
        }

        if(errors.length == 0){
            alert('Message sent successfully!');
            $(".form-errors").text("");
            $("[name='Name']").val("");
            $("[name='Email']").val("");
            $("[name='Subject']").val("");
            $("[name='Message']").val("");
        }
        else{
            $(".form-errors").text("");
            errors.forEach(element => {
                if(element == 'name'){
                    $(".form-errors").append("<p class='text-light'>Name can only have letters between 2 and 15 characters long.</p>");
                }
                if(element == 'email'){
                    $(".form-errors").append("<p class='text-light'>Email is not in the right format.</p>");
                }
                if(element == 'subject'){
                    $(".form-errors").append("<p class='text-light'>Subject needs to be 50 or less characters, also special characters like #$%&/()'<>;: are not allowed.</p>");
                }
                if(element == 'message'){
                    $(".form-errors").append("<p class='text-light'>Message needs to be 300 or less characters, also special characters like #$%&/()'<>;: are not allowed.</p>");
                }
            });
        }


    })
    
})