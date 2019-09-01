

// fill this file with validation
export default{
    validatePartners: (numTeam,partners,participants, terms)=> {
        let objection = null;
        let passedPartners = [];
        if(!terms){
            objection = 'Please agree to terms before registering'
        } else if(partners.length!=numTeam){
            objection = 'Please Select ' + numTeam + ' Partners'
        } else{
            partners.forEach(partner => {
                if(participants.includes(partner)){
                    objection = partner + ' is already registered in another team'
                } else if(passedPartners.includes(partner)) {
                    objection = 'Please select different partners in each fields';
                }
                passedPartners.push(partner)
            })
        }
        return objection;
    },
    validateUserInformation(userProfile,terms,password,confirmPassword){
        let objection = null;
        if(!userProfile){
            objection = 'Something went wrong please contact on the numbers provided'
        }
        var emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        var discordRegex = /^.*#[0-9]{4}$/
        //NAME TESTS
        if(!userProfile.name){
            objection = 'Please Enter a Name'
        } else if(userProfile.name.length<=4){
            objection = 'Name Must Be Longer Than 4 Characters'
        } else if(userProfile.name.length>50){
            objection = 'Name Must Be Smaller Than 50 Characters'
        }
        //EMAIL TESTS
        if(!userProfile.email){
            objection = 'Please Enter an Email'
        } else if(!userProfile.email.match(emailRegex)){
            objection = 'Please Enter a Correct Email Address'
        } else if(userProfile.email.length>=100){
            objection = 'Email Must be Smaller than 100 Characters'
        }
        //DISCORD ID TESTS
        if(userProfile.discordID){
            if(!userProfile.discordID.match(discordRegex)){
                objection = 'Please Enter A Correct Discord ID e.g abc#1234'
            } else if(userProfile.discordID.length >= 100){
                objection = 'Discord ID Must Be Smaller Than 100 Characters'
            }
        }
        //Check Terms Are Selected
        if(!terms){
            objection = "Please Read And Agree to Terms"
        }
        //Check Password Match
        if(password!=confirmPassword){
            objection = "Your Password Don't Match"
        } else if(password.length<6){
            objection = "Passwords Must Be Atleast 6 Characters"
        }
        return objection;
    }

}